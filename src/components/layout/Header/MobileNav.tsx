import { useCallback, useEffect, useRef, Fragment, useState, RefObject } from 'react';
import { useLockBodyScroll, useFocusTrap } from '@/hooks/accessibility';
import { motion, } from 'framer-motion';
import {
  Scale,
  FileText,
  Bell,
  User,
  Mail,
  Search
} from 'lucide-react';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  onSignIn?: () => void;
  onGetStarted?: () => void;
  onSignOut: () => Promise<void>;
  isFollowing?: boolean;
  onFollowClick?: () => Promise<void>;
  userData?: {
    name: string;
    email: string;
    avatar?: string;
    role: 'teacher' | 'student' | 'educator' | 'parent' | 'subscriber' | 'admin';
    language: 'en' | 'es' | 'fr' | 'de' | 'pt' | 'sw' | 'zh' | 'ar';
    region: 'na' | 'eu' | 'asia' | 'africa' | 'sa' | 'oceania';
  };
  currentPlan?: 'free' | 'pro' | 'enterprise' | 'corporate';
  onQuickAction?: (action: 'save_article' | 'set_alert' | 'download_brief') => void;
  // AUTH METHODS - optional for backward compatibility
  onGoogleSignIn?: () => void;
  onMicrosoftSignIn?: () => void;
  onAppleSignIn?: () => void;
  onEmailSignIn?: () => void;
  onSAMLSignIn?: (idp: string) => void;
  // LOCALIZATION - optional with defaults
  availableLanguages?: Array<{ code: string; name: string; flag?: string }>;
  currentLanguage?: string;
  onLanguageChange?: (lang: string) => void;
}

interface NavItem {
  label: string;
  href: string;
  description: string;
  requiresAuth: boolean;
  badge?: string;
}

const PROFESSIONAL_NAV_ITEMS: NavItem[] = [
  {
    label: 'Blog',
    href: '/blog',
    description: 'Latest articles',
    requiresAuth: false
  },
];

const AUTH_METHODS = [
  {
    id: 'google',
    name: 'Google',
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
    ),
    color: 'hover:bg-gray-50 border-gray-300 text-gray-700',
    bgColor: 'bg-white'
  },
  // {
  //   id: 'microsoft',
  //   name: 'Microsoft',
  //   icon: () => (
  //     <svg className="w-5 h-5" viewBox="0 0 23 23">
  //       <path fill="#f35325" d="M1 1h10v10H1z"/>
  //       <path fill="#81bc06" d="M12 1h10v10H12z"/>
  //       <path fill="#05a6f0" d="M1 12h10v10H1z"/>
  //       <path fill="#ffba08" d="M12 12h10v10H12z"/>
  //     </svg>
  //   ),
  //   color: 'hover:bg-blue-50 border-blue-300 text-blue-700',
  //   bgColor: 'bg-white'
  // },
  {
    id: 'apple',
    name: 'Apple',
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path d="M14.94 5.19A4.38 4.38 0 0 0 16 2a4.44 4.44 0 0 0-3 1.52 4.17 4.17 0 0 0-1 3.09 3.69 3.69 0 0 0 2.94-1.42zm2.52 7.44a4.51 4.51 0 0 1 2.16-3.81 4.66 4.66 0 0 0-3.66-2c-1.56-.16-3 .91-3.83.91s-2-.89-3.3-.87a4.92 4.92 0 0 0-4.14 2.53C2.93 12.45 4.24 17 6 19.47c.8 1.21 1.8 2.58 3.12 2.53s1.75-.76 3.28-.76 2 .76 3.3.73 2.22-1.24 3.06-2.45a11 11 0 0 0 1.38-2.85 4.41 4.41 0 0 1-2.68-4.04z" />
      </svg>
    ),
    color: 'hover:bg-gray-900 border-gray-900 text-gray-900',
    bgColor: 'bg-black'
  },
  {
    id: 'email',
    name: 'Email',
    icon: Mail,
    color: 'hover:bg-blue-50 border-blue-600 text-blue-600',
    bgColor: 'bg-white'
  },
  // {
  //   id: 'sso',
  //   name: 'Enterprise SSO',
  //   icon: Key,
  //   color: 'hover:bg-purple-50 border-purple-600 text-purple-600',
  //   bgColor: 'bg-white'
  // }
];

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  onClose,
  isAuthenticated,
  onSignIn,
  onGetStarted,
  userData,
  currentPlan = 'free',
  onSignOut,
  isFollowing,
  onFollowClick,
  onQuickAction,
  // Auth methods - optional
  onGoogleSignIn,
  onMicrosoftSignIn,
  onAppleSignIn,
  onEmailSignIn,
  onSAMLSignIn,
  // Localization - optional with defaults
  availableLanguages = DEFAULT_LANGUAGES,
  currentLanguage = 'en',
  onLanguageChange
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [showAuthMethods, setShowAuthMethods] = useState(false);

  useLockBodyScroll(isOpen);
  useFocusTrap(panelRef as RefObject<HTMLElement>, isOpen);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  const handleSignOut = useCallback(async () => {
    await onSignOut();
    onClose();
  }, [onSignOut, onClose]);

  const handleQuickAction = useCallback((action: 'save_article' | 'set_alert' | 'download_brief') => {
    if (onQuickAction) {
      onQuickAction(action);
    }
    onClose();
  }, [onQuickAction, onClose]);

  const handleAuthMethod = useCallback((methodId: string) => {
    switch (methodId) {
      case 'google':
        if (onGoogleSignIn) onGoogleSignIn();
        else if (onSignIn) onSignIn();
        break;
      // case 'microsoft':
      //   if (onMicrosoftSignIn) onMicrosoftSignIn();
      //   else if (onSignIn) onSignIn();
      //   break;
      case 'apple':
        if (onAppleSignIn) onAppleSignIn();
        else if (onSignIn) onSignIn();
        break;
      case 'email':
        if (onEmailSignIn) onEmailSignIn();
        else if (onSignIn) onSignIn();
        break;
      // case 'sso':
      //   if (onSAMLSignIn) onSAMLSignIn('corporate');
      //   else if (onSignIn) onSignIn();
      //   break;
    }
    onClose();
  }, [onGoogleSignIn, onMicrosoftSignIn, onAppleSignIn, onEmailSignIn, onSAMLSignIn, onSignIn, onClose]);

  const getLocalizedLabel = (label: string) => {
  return label; // Desktop uses simple strings, no localization needed
};

  const getCurrentLanguageName = () => {
    if (availableLanguages) {
      const lang = availableLanguages.find(l => l.code === currentLanguage);
      return lang ? lang.name : 'English';
    }
    return 'English';
  };

  if (!isOpen) return null;

  return (
    <Fragment>
      {/* Professional backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] bg-gradient-to-br from-gray-900/80 via-blue-900/40 to-black/90 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Navigation Panel */}
      <motion.aside
        ref={panelRef}
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
        className="fixed inset-y-0 left-0 z-[101] w-[85vw] max-w-sm bg-white dark:bg-gray-900 shadow-2xl md:hidden overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label="Main navigation"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Sign In button */}
        <div className="border-b border-gray-200 dark:border-gray-800 px-6 py-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                EDU NEWS
              </h2>
              {/* <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Global legal insights • Worldwide coverage
              </p> */}
            </div>
            <div className="flex items-center gap-2">
              {!isAuthenticated && (
                <button
                  onClick={() => setShowAuthMethods(!showAuthMethods)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-semibold bg-gradient-to-r from-ulue500 to-belu-00 text-white rounded-xl hover:from-bl-lu60 hover:to-blu7lu0 shadow-md hover:shadow-lg shadow-blue0lu050 hover:shadow-blue-0lu/0 transition-all duration-300 transform hover:scale-105 border border-blue-4/lu5"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Sign In
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Close navigation"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Language Selector */}
          {/* <div className="relative">
            <button
              onClick={() => setShowLanguageSelector(!showLanguageSelector)}
              className="flex items-center justify-between w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>{getCurrentLanguageName()}</span>
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform ${showLanguageSelector ? 'rotate-90' : ''}`} />
            </button>
            
            {showLanguageSelector && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-10">
                <div className="py-2 max-h-60 overflow-y-auto">
                  {availableLanguages?.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        if (onLanguageChange) {
                          onLanguageChange(lang.code);
                        }
                        setShowLanguageSelector(false);
                      }}
                      className={`flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        currentLanguage === lang.code ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''
                      }`}
                    >
                      {lang.flag && <span className="mr-3 text-lg">{lang.flag}</span>}
                      <span>{lang.name}</span>
                      {currentLanguage === lang.code && (
                        <span className="ml-auto text-blue-500">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div> */}
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 py-6">
          <div className="px-6 space-y-1">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
              Navigation
            </h3>

            <ul className="space-y-2">
              {PROFESSIONAL_NAV_ITEMS.map((item) => {
                const label = getLocalizedLabel(item.label);
                const isLocked = item.requiresAuth && !isAuthenticated;

                return (
                  <li key={item.href}>
                    <a
                      href={isLocked ? '#auth' : item.href}
                      onClick={(e) => {
                        if (isLocked) {
                          e.preventDefault();
                          setShowAuthMethods(true);
                        } else {
                          onClose();
                        }
                      }}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all ${isLocked
                          ? 'bg-gray-50 dark:bg-gray-800/50 text-gray-400 dark:text-gray-500'
                          : 'hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                        }`}
                    >
                      <div className="flex items-center space-x-3">
                        {/* <Icon className="w-5 h-5" /> */}
                        <span className="font-medium">{label}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {item.badge && (
                          <span className={`text-xs px-2 py-1 rounded ${item.badge === 'Pro'
                              ? 'bg-ulue100 text-belu-00 dark:bg-bl-lu90/30 dark:text-blu3lu0'
                              : item.badge === 'Enterprise'
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                                : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            }`}>
                            {item.badge}
                          </span>
                        )}
                        {isLocked && (
                          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Authentication Section - Show when Sign In button is clicked */}
        {showAuthMethods && (
          <div className="border-t border-gray-200 dark:border-gray-800 px-6 py-6">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Sign In</h3>
              
              <button 
                onClick={() => handleAuthMethod('google')} 
                className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] group"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
                <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700">Continue with Google</span>
              </button>
              
              <button 
                onClick={() => handleAuthMethod('email')} 
                className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] group"
              >
                <Mail className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
                <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700">Continue with Email</span>
              </button>
              
              <button 
                onClick={() => handleAuthMethod('apple')} 
                className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] group"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-800" viewBox="0 0 24 24">
                    <path d="M14.94 5.19A4.38 4.38 0 0 0 16 2a4.44 4.44 0 0 0-3 1.52 4.17 4.17 0 0 0-1 3.09 3.69 3.69 0 0 0 2.94-1.42zm2.52 7.44a4.51 4.51 0 0 1 2.16-3.81 4.66 4.66 0 0 0-3.66-2c-1.56-.16-3 .91-3.83.91s-2-.89-3.3-.87a4.92 4.92 0 0 0-4.14 2.53C2.93 12.45 4.24 17 6 19.47c.8 1.21 1.8 2.58 3.12 2.53s1.75-.76 3.28-.76 2 .76 3.3.73 2.22-1.24 3.06-2.45a11 11 0 0 0 1.38-2.85 4.41 4.41 0 0 1-2.68-4.04z"/>
                  </svg>
                </div>
                <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700">Continue with Apple</span>
              </button>
            </div>
          </div>
        )}

        {/* Sign Out Section - Only show when authenticated */}
        {isAuthenticated && (
          <div className="border-t border-gray-200 dark:border-gray-800 px-6 py-6">
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-2.5 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </motion.aside>
    </Fragment>
  );
};

// ============================
// Language Configuration Helper
// ============================

export const DEFAULT_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'sw', name: 'Kiswahili', flag: '🇹🇿' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

// ============================
// User Region Detection Helper
// ============================

export const detectUserRegion = (): 'na' | 'eu' | 'asia' | 'africa' | 'sa' | 'oceania' => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (timezone.includes('America')) {
    if (timezone.includes('New_York') || timezone.includes('Chicago') || timezone.includes('Denver') || timezone.includes('Los_Angeles')) {
      return 'na';
    }
    return 'sa';
  } else if (timezone.includes('Europe')) {
    return 'eu';
  } else if (timezone.includes('Asia')) {
    return 'asia';
  } else if (timezone.includes('Africa')) {
    return 'africa';
  } else if (timezone.includes('Australia') || timezone.includes('Pacific')) {
    return 'oceania';
  }

  return 'na'; // Default to North America
};

// ============================
// Region-Specific Content Configuration
// ============================

export const REGION_CONFIGS = {
  na: {
    primaryAuth: 'google',
    defaultLanguage: 'en',
    legalSystems: ['Common Law', 'UCC'],
    jurisdictions: ['Federal', 'State'],
  },
  eu: {
    primaryAuth: 'microsoft',
    defaultLanguage: 'en',
    legalSystems: ['Civil Law', 'EU Law'],
    jurisdictions: ['EU', 'National'],
  },
  asia: {
    primaryAuth: 'email',
    defaultLanguage: 'en',
    legalSystems: ['Civil Law', 'Common Law', 'Mixed'],
    jurisdictions: ['National', 'Special Zones'],
  },
  africa: {
    primaryAuth: 'email',
    defaultLanguage: 'en',
    legalSystems: ['Common Law', 'Civil Law', 'Customary'],
    jurisdictions: ['National', 'Regional'],
  },
  sa: {
    primaryAuth: 'google',
    defaultLanguage: 'es',
    legalSystems: ['Civil Law'],
    jurisdictions: ['National', 'Federal'],
  },
  oceania: {
    primaryAuth: 'google',
    defaultLanguage: 'en',
    legalSystems: ['Common Law'],
    jurisdictions: ['Federal', 'State'],
  },
};