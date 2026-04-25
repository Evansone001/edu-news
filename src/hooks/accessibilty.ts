import { useEffect, useRef, RefObject } from 'react';

// ============================
// useLockBodyScroll
// ============================

interface ScrollLockOptions {
  enabled?: boolean;
  reserveScrollBarGap?: boolean;
  lockTarget?: 'body' | 'html' | 'both';
  fillScrollbarGap?: boolean;
}

export function useLockBodyScroll(
  lock: boolean,
  options: ScrollLockOptions = {}
): void {
  const {
    enabled = true,
    reserveScrollBarGap = true,
    lockTarget = 'both',
    fillScrollbarGap = true,
  } = options;

  const originalStyles = useRef<{
    body: {
      overflow: string;
      paddingRight: string;
    };
    html?: {
      overflow: string;
      paddingRight: string;
    };
  }>({
    body: { overflow: '', paddingRight: '' },
  });

  const scrollbarWidth = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;

    const calculateScrollbarWidth = (): number => {
      // Create a temporary div to measure scrollbar width
      const outer = document.createElement('div');
      outer.style.visibility = 'hidden';
      outer.style.overflow = 'scroll';
      outer.style.position = 'absolute';
      outer.style.width = '100px';
      outer.style.height = '100px';
      document.body.appendChild(outer);

      const inner = document.createElement('div');
      inner.style.width = '100%';
      inner.style.height = '100%';
      outer.appendChild(inner);

      const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

      outer.parentNode?.removeChild(outer);
      return scrollbarWidth;
    };

    scrollbarWidth.current = calculateScrollbarWidth();

    if (lock) {
      // Save original styles
      originalStyles.current.body = {
        overflow: document.body.style.overflow,
        paddingRight: document.body.style.paddingRight,
      };

      if (lockTarget === 'html' || lockTarget === 'both') {
        const html = document.documentElement;
        originalStyles.current.html = {
          overflow: html.style.overflow,
          paddingRight: html.style.paddingRight,
        };
      }

      // Apply locking
      if (lockTarget === 'body' || lockTarget === 'both') {
        document.body.style.overflow = 'hidden';
        
        if (reserveScrollBarGap && scrollbarWidth.current > 0) {
          const currentPaddingRight = parseInt(
            window.getComputedStyle(document.body).paddingRight,
            10
          ) || 0;
          
          document.body.style.paddingRight = `${
            currentPaddingRight + scrollbarWidth.current
          }px`;
          
          if (fillScrollbarGap) {
            document.body.classList.add('scrollbar-gap-fill');
          }
        }
      }

      if (lockTarget === 'html' || lockTarget === 'both') {
        const html = document.documentElement;
        html.style.overflow = 'hidden';
        
        if (reserveScrollBarGap && scrollbarWidth.current > 0) {
          const currentPaddingRight = parseInt(
            window.getComputedStyle(html).paddingRight,
            10
          ) || 0;
          
          html.style.paddingRight = `${
            currentPaddingRight + scrollbarWidth.current
          }px`;
        }
      }

      // Prevent iOS "rubber band" effect
      const preventDefault = (e: TouchEvent) => {
        if (e.touches.length === 1) {
          e.preventDefault();
        }
      };

      document.addEventListener('touchmove', preventDefault, { passive: false });

      return () => {
        document.removeEventListener('touchmove', preventDefault);

        // Restore original styles
        if (lockTarget === 'body' || lockTarget === 'both') {
          document.body.style.overflow = originalStyles.current.body.overflow;
          document.body.style.paddingRight = originalStyles.current.body.paddingRight;
          
          if (fillScrollbarGap) {
            document.body.classList.remove('scrollbar-gap-fill');
          }
        }

        if (lockTarget === 'html' || lockTarget === 'both' && originalStyles.current.html) {
          const html = document.documentElement;
          if (originalStyles.current.html) {
            html.style.overflow = originalStyles.current.html.overflow;
            html.style.paddingRight = originalStyles.current.html.paddingRight;
          }
        }
      };
    }
  }, [lock, enabled, reserveScrollBarGap, lockTarget, fillScrollbarGap]);
}

// ============================
// useFocusTrap
// ============================

interface FocusTrapOptions {
  enabled?: boolean;
  escapeDeactivates?: boolean;
  clickOutsideDeactivates?: boolean;
  returnFocusOnDeactivate?: boolean;
  initialFocus?: string | (() => HTMLElement | null);
  fallbackFocus?: string | (() => HTMLElement | null);
  preventScroll?: boolean;
  checkCanFocusTrap?: (containers: HTMLElement[]) => Promise<void>;
}

export function useFocusTrap<T extends HTMLElement>(
  containerRef: RefObject<T | null>,
  active: boolean,
  options: FocusTrapOptions = {}
): void {
  const {
    enabled = true,
    escapeDeactivates = true,
    clickOutsideDeactivates = false,
    returnFocusOnDeactivate = true,
    initialFocus,
    fallbackFocus = 'body',
    preventScroll = true,
    checkCanFocusTrap,
  } = options;

  const previousActiveElement = useRef<HTMLElement | null>(null);
  const focusableElements = useRef<HTMLElement[]>([]);
  const firstFocusableElement = useRef<HTMLElement | null>(null);
  const lastFocusableElement = useRef<HTMLElement | null>(null);

  const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
    const focusableSelectors = [
      'a[href]:not([disabled])',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled]):not([type="hidden"])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
      'details > summary:first-of-type',
      'iframe',
    ];

    const elements = Array.from(
      container.querySelectorAll<HTMLElement>(focusableSelectors.join(', '))
    );

    // Filter out hidden and disabled elements
    return elements.filter((element) => {
      const style = window.getComputedStyle(element);
      const isVisible = !(
        style.display === 'none' ||
        style.visibility === 'hidden' ||
        element.getAttribute('aria-hidden') === 'true'
      );

      const isDisabled = element.hasAttribute('disabled');
      const hasTabIndex = element.hasAttribute('tabindex');
      const tabIndex = element.getAttribute('tabindex');
      const isNegativeTabIndex = hasTabIndex && parseInt(tabIndex || '0', 10) < 0;

      return isVisible && !isDisabled && !isNegativeTabIndex;
    });
  };

  const focusElement = (selectorOrFunction: string | (() => HTMLElement | null)): void => {
    let element: HTMLElement | null = null;

    if (typeof selectorOrFunction === 'function') {
      element = selectorOrFunction();
    } else {
      element = document.querySelector<HTMLElement>(selectorOrFunction);
    }

    if (element) {
      element.focus({ preventScroll });
    }
  };

  const trapFocus = (event: KeyboardEvent): void => {
    if (!containerRef.current || !active) return;

    if (event.key === 'Tab') {
      if (focusableElements.current.length === 0) {
        focusableElements.current = getFocusableElements(containerRef.current);
        firstFocusableElement.current = focusableElements.current[0] || null;
        lastFocusableElement.current = focusableElements.current[focusableElements.current.length - 1] || null;
      }

      if (focusableElements.current.length === 0) return;

      const { current: first } = firstFocusableElement;
      const { current: last } = lastFocusableElement;

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === first) {
          event.preventDefault();
          last?.focus({ preventScroll });
        }
      } else {
        // Tab
        if (document.activeElement === last) {
          event.preventDefault();
          first?.focus({ preventScroll });
        }
      }
    } else if (escapeDeactivates && event.key === 'Escape') {
      event.preventDefault();
      // Dispatch custom escape event
      containerRef.current.dispatchEvent(
        new CustomEvent('focus-trap-escape', { bubbles: true })
      );
    }
  };

  const handleClickOutside = (event: MouseEvent): void => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node) &&
      clickOutsideDeactivates
    ) {
      event.preventDefault();
      containerRef.current.dispatchEvent(
        new CustomEvent('focus-trap-click-outside', { bubbles: true })
      );
    }
  };

  useEffect(() => {
    if (!enabled || !active || !containerRef.current) return;

    // Save previous active element
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Get focusable elements
    focusableElements.current = getFocusableElements(containerRef.current);
    firstFocusableElement.current = focusableElements.current[0] || null;
    lastFocusableElement.current = focusableElements.current[focusableElements.current.length - 1] || null;

    // Set up trap
    const container = containerRef.current;

    // Check if we can trap focus
    if (checkCanFocusTrap) {
      checkCanFocusTrap([container]).catch(() => {
        console.warn('Focus trap initialization failed');
      });
    }

    // Set initial focus
    if (initialFocus) {
      focusElement(initialFocus);
    } else if (firstFocusableElement.current) {
      firstFocusableElement.current.focus({ preventScroll });
    } else if (fallbackFocus) {
      focusElement(fallbackFocus);
    }

    // Add event listeners
    document.addEventListener('keydown', trapFocus);
    
    if (clickOutsideDeactivates) {
      document.addEventListener('click', handleClickOutside, true);
    }

    // Dispatch focus trap activated event
    container.dispatchEvent(new CustomEvent('focus-trap-activated', { bubbles: true }));

    return () => {
      // Cleanup
      document.removeEventListener('keydown', trapFocus);
      document.removeEventListener('click', handleClickOutside, true);

      // Return focus to previous element
      if (returnFocusOnDeactivate && previousActiveElement.current) {
        previousActiveElement.current.focus({ preventScroll });
      }

      // Clear refs
      focusableElements.current = [];
      firstFocusableElement.current = null;
      lastFocusableElement.current = null;

      // Dispatch focus trap deactivated event
      container.dispatchEvent(new CustomEvent('focus-trap-deactivated', { bubbles: true }));
    };
  }, [
    active,
    enabled,
    escapeDeactivates,
    clickOutsideDeactivates,
    returnFocusOnDeactivate,
    initialFocus,
    fallbackFocus,
    preventScroll,
    checkCanFocusTrap,
  ]);
}

// ============================
// useAriaLive (Bonus hook)
// ============================

interface AriaLiveMessage {
  id: string;
  message: string;
  priority: 'polite' | 'assertive';
  timeout?: number;
}

export function useAriaLive(): {
  announce: (message: string, priority?: 'polite' | 'assertive', timeout?: number) => void;
  clear: () => void;
} {
  const liveRegionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create live region if it doesn't exist
    let liveRegion = document.getElementById('a11y-live-region') as HTMLDivElement;

    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'a11y-live-region';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.setAttribute('aria-relevant', 'additions text');
      liveRegion.style.position = 'absolute';
      liveRegion.style.width = '1px';
      liveRegion.style.height = '1px';
      liveRegion.style.padding = '0';
      liveRegion.style.margin = '-1px';
      liveRegion.style.overflow = 'hidden';
      liveRegion.style.clip = 'rect(0, 0, 0, 0)';
      liveRegion.style.whiteSpace = 'nowrap';
      liveRegion.style.border = '0';

      document.body.appendChild(liveRegion);
    }

    liveRegionRef.current = liveRegion;

    return () => {
      // Cleanup messages on unmount
      if (liveRegionRef.current) {
        liveRegionRef.current.innerHTML = '';
      }
    };
  }, []);

  const announce = useRef((message: string, priority: 'polite' | 'assertive' = 'polite', timeout?: number) => {
    if (!liveRegionRef.current) return;

    // Clear previous messages
    liveRegionRef.current.innerHTML = '';

    // Update live region attributes based on priority
    liveRegionRef.current.setAttribute('aria-live', priority);

    // Add new message
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    liveRegionRef.current.appendChild(messageElement);

    // Auto-clear after timeout if specified
    if (timeout) {
      setTimeout(() => {
        if (liveRegionRef.current && liveRegionRef.current.contains(messageElement)) {
          liveRegionRef.current.removeChild(messageElement);
        }
      }, timeout);
    }
  }).current;

  const clear = useRef(() => {
    if (liveRegionRef.current) {
      liveRegionRef.current.innerHTML = '';
    }
  }).current;

  return { announce, clear };
}

// ============================
// useSkipNavigation (Bonus hook)
// ============================

export function useSkipNavigation(targetId: string = 'main-content'): {
  skipLinkRef: React.RefObject<HTMLAnchorElement | null>;
  focusTargetRef: React.RefObject<HTMLElement | null>;
} {
  const skipLinkRef = useRef<HTMLAnchorElement>(null);
  const focusTargetRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleSkip = (event: KeyboardEvent) => {
      if (event.key === 'Tab' && !skipLinkRef.current?.contains(document.activeElement)) {
        // First tab press - focus skip link
        event.preventDefault();
        skipLinkRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleSkip);

    return () => {
      document.removeEventListener('keydown', handleSkip);
    };
  }, []);

  return { skipLinkRef, focusTargetRef };
}

// ============================
// CSS for scrollbar gap (add to global CSS)
// ============================

/**
 * Add this to your global CSS:
 * 
 * .scrollbar-gap-fill::before {
 *   content: '';
 *   position: fixed;
 *   top: 0;
 *   right: 0;
 *   bottom: 0;
 *   width: var(--scrollbar-width, 0px);
 *   background-color: transparent;
 *   pointer-events: none;
 *   z-index: 9999;
 * }
 * 
 * :root {
 *   --scrollbar-width: 0px;
 * }
 */

export default {
  useLockBodyScroll,
  useFocusTrap,
  useAriaLive,
  useSkipNavigation,
};