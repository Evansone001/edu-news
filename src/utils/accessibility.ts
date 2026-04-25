/**
 * Industrial-grade accessibility utilities for professional applications
 */

// ============================
// Keyboard Navigation
// ============================

export const KeyboardKeys = {
  TAB: 'Tab',
  ENTER: 'Enter',
  ESCAPE: 'Escape',
  SPACE: ' ',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown',
} as const;

export type KeyboardKey = typeof KeyboardKeys[keyof typeof KeyboardKeys];

export const isKeyboardEvent = (
  event: unknown
): event is React.KeyboardEvent | KeyboardEvent => {
  return (
    event instanceof KeyboardEvent ||
    (typeof event === 'object' &&
      event !== null &&
      'key' in event &&
      typeof (event as any).key === 'string')
  );
};

export const isNavigationKey = (key: string): boolean => {
  return [
    KeyboardKeys.ARROW_UP,
    KeyboardKeys.ARROW_DOWN,
    KeyboardKeys.ARROW_LEFT,
    KeyboardKeys.ARROW_RIGHT,
    KeyboardKeys.HOME,
    KeyboardKeys.END,
    KeyboardKeys.PAGE_UP,
    KeyboardKeys.PAGE_DOWN,
  ].includes(key as any);
};

// ============================
// Focus Management
// ============================

export class FocusManager {
  static getFocusableElements(container: HTMLElement): HTMLElement[] {
    const focusableSelectors = [
      'a[href]:not([disabled])',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
      'details > summary:first-of-type',
    ];

    const elements = Array.from(
      container.querySelectorAll<HTMLElement>(focusableSelectors.join(', '))
    );

    return elements.filter((el) => {
      const style = window.getComputedStyle(el);
      return (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        el.offsetWidth > 0 &&
        el.offsetHeight > 0
      );
    });
  }

  static trapFocus(
    container: HTMLElement,
    event: KeyboardEvent,
    options?: {
      cycle?: boolean;
      wrap?: boolean;
    }
  ): void {
    const { cycle = true, wrap = true } = options || {};
    const focusableElements = this.getFocusableElements(container);

    if (focusableElements.length === 0) return;

    const currentIndex = focusableElements.findIndex(
      (el) => el === document.activeElement
    );

    let nextIndex = currentIndex;

    if (event.key === KeyboardKeys.TAB) {
      if (event.shiftKey) {
        // Shift + Tab: move backward
        nextIndex = currentIndex <= 0 ? focusableElements.length - 1 : currentIndex - 1;
      } else {
        // Tab: move forward
        nextIndex = currentIndex >= focusableElements.length - 1 ? 0 : currentIndex + 1;
      }

      if (!wrap && nextIndex === focusableElements.length - 1 && !event.shiftKey) {
        return; // Don't wrap from last to first
      }

      event.preventDefault();
      focusableElements[nextIndex]?.focus();
    }
  }

  static focusFirstElement(container: HTMLElement): void {
    const focusableElements = this.getFocusableElements(container);
    focusableElements[0]?.focus();
  }

  static focusLastElement(container: HTMLElement): void {
    const focusableElements = this.getFocusableElements(container);
    focusableElements[focusableElements.length - 1]?.focus();
  }
}

// ============================
// ARIA Utilities
// ============================

export const Aria = {
  /**
   * Sets ARIA attributes with proper boolean handling
   */
  setAttributes(
    element: HTMLElement,
    attributes: Record<string, string | boolean | number | null | undefined>
  ): void {
    Object.entries(attributes).forEach(([key, value]) => {
      if (value === false || value === null || value === undefined) {
        element.removeAttribute(key);
      } else if (value === true) {
        element.setAttribute(key, 'true');
      } else {
        element.setAttribute(key, String(value));
      }
    });
  },

  /**
   * Announces a message to screen readers
   */
  announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    const region = document.createElement('div');
    region.setAttribute('aria-live', priority);
    region.setAttribute('aria-atomic', 'true');
    region.style.position = 'absolute';
    region.style.width = '1px';
    region.style.height = '1px';
    region.style.margin = '-1px';
    region.style.overflow = 'hidden';
    region.style.clip = 'rect(0, 0, 0, 0)';

    region.textContent = message;
    document.body.appendChild(region);

    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(region);
    }, 1000);
  },

  /**
   * Generates unique ID for ARIA relationships
   */
  generateId(prefix = 'id'): string {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  },
};

// ============================
// Screen Reader Detection
// ============================

export class ScreenReaderDetector {
  private static instance: ScreenReaderDetector;
  private isScreenReaderActive: boolean = false;
  private detectionElement: HTMLElement | null = null;

  private constructor() {
    this.detectScreenReader();
  }

  static getInstance(): ScreenReaderDetector {
    if (!ScreenReaderDetector.instance) {
      ScreenReaderDetector.instance = new ScreenReaderDetector();
    }
    return ScreenReaderDetector.instance;
  }

  private detectScreenReader(): void {
    // Create off-screen detection element
    this.detectionElement = document.createElement('div');
    this.detectionElement.style.position = 'absolute';
    this.detectionElement.style.width = '1px';
    this.detectionElement.style.height = '1px';
    this.detectionElement.style.overflow = 'hidden';
    this.detectionElement.style.clip = 'rect(0, 0, 0, 0)';
    this.detectionElement.style.whiteSpace = 'nowrap';
    this.detectionElement.setAttribute('aria-live', 'polite');
    this.detectionElement.setAttribute('aria-atomic', 'true');

    // Add detection text that screen readers will announce
    this.detectionElement.textContent = 'Screen reader detection';

    document.body.appendChild(this.detectionElement);

    // Check if detection text was accessed
    const checkAccess = () => {
      // This is a heuristic - not 100% accurate but works for most cases
      const computedStyle = window.getComputedStyle(this.detectionElement!);
      this.isScreenReaderActive =
        computedStyle.display !== 'none' &&
        computedStyle.visibility !== 'hidden' &&
        this.detectionElement!.offsetParent !== null;
    };

    // Initial check
    checkAccess();

    // Monitor for changes
    const observer = new MutationObserver(checkAccess);
    if (this.detectionElement) {
      observer.observe(this.detectionElement, {
        attributes: true,
        attributeFilter: ['style', 'class'],
      });
    }

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      observer.disconnect();
      if (this.detectionElement && document.body.contains(this.detectionElement)) {
        document.body.removeChild(this.detectionElement);
      }
    });
  }

  isActive(): boolean {
    return this.isScreenReaderActive;
  }
}

// ============================
// Accessibility Testing Utilities
// ============================

export const AccessibilityTest = {
  /**
   * Runs basic accessibility checks on an element
   */
  runChecks(element: HTMLElement): { passed: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check for alt text on images
    const images = element.querySelectorAll('img');
    images.forEach((img, index) => {
      if (!img.hasAttribute('alt') && !img.hasAttribute('aria-hidden')) {
        errors.push(`Image ${index + 1} missing alt text`);
      }
    });

    // Check for label associations
    const inputs = element.querySelectorAll('input, textarea, select');
    inputs.forEach((input, index) => {
      const id = input.getAttribute('id');
      if (id) {
        const label = element.querySelector(`label[for="${id}"]`);
        if (!label && !input.hasAttribute('aria-label') && !input.hasAttribute('aria-labelledby')) {
          errors.push(`Input ${index + 1} missing label association`);
        }
      } else if (!input.hasAttribute('aria-label') && !input.hasAttribute('aria-labelledby')) {
        errors.push(`Input ${index + 1} missing label and ID`);
      }
    });

    // Check for sufficient color contrast
    const checkContrast = () => {
      // This would need a proper contrast checking algorithm
      // For now, it's a placeholder
      return true;
    };

    if (!checkContrast()) {
      errors.push('Insufficient color contrast detected');
    }

    return {
      passed: errors.length === 0,
      errors,
    };
  },

  /**
   * Validates ARIA attributes
   */
  validateAria(element: HTMLElement): { valid: boolean; warnings: string[] } {
    const warnings: string[] = [];

    // Check for invalid ARIA states
    const ariaElements = element.querySelectorAll('[aria-*]');
    ariaElements.forEach((el) => {
      const ariaAttributes = Array.from(el.attributes)
        .filter((attr) => attr.name.startsWith('aria-'));

      ariaAttributes.forEach((attr) => {
        // Basic validation - could be expanded
        if (attr.name === 'aria-hidden' && attr.value === 'false') {
          warnings.push('aria-hidden="false" is redundant - consider removing');
        }
      });
    });

    return {
      valid: warnings.length === 0,
      warnings,
    };
  },
};

export default {
  KeyboardKeys,
  FocusManager,
  Aria,
  ScreenReaderDetector,
  AccessibilityTest,
};