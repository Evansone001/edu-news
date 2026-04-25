import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronDown, 
  Bell, 
  Search, 
  Globe,
  Bookmark,
  User,
  Settings,
  LogOut,
  Briefcase,
  FileText,
  Shield,
  Scale,
  Users,
  Building,
  Download,
  Menu,
  Mail,
  X
} from 'lucide-react';
import { Logo } from './Logo';

// Loading Skeleton Component
const HeaderSkeleton = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="hidden lg:flex items-center gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  </header>
);

// Types
interface UserData {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  role?: 'attorney' | 'judge' | 'legal_professional' | 'student' | 'subscriber' | 'corporate';
  plan?: 'free' | 'pro' | 'enterprise' | 'corporate';
  region?: 'na' | 'eu' | 'asia' | 'africa' | 'sa' | 'oceania';
}

interface HeaderProps {
  user: UserData | null;
  isFollowing: boolean;
  currentLanguage: string;
  availableLanguages: Array<{code: string; name: string; flag?: string}>;
  onFollow: () => void;
  onSignOut: () => Promise<void>;
  onSignIn: (provider?: 'google' | 'microsoft' | 'apple' | 'email') => void;
  onGetStarted: () => void;
  onLanguageChange: (lang: string) => void;
  onQuickAction: (action: string) => void;
  onMobileMenuToggle: () => void;
}

const PROFESSIONAL_NAV_ITEMS = [
  {
    label: 'Blog',
    href: '/blog',
    description: 'Latest articles',
    requiresAuth: false,
    badge: undefined
  },
];

export const ProfessionalHeader: React.FC<HeaderProps> = ({
  user,
  onSignOut,
  onSignIn,
  onQuickAction,
  onMobileMenuToggle
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNavDropdownOpen, setIsNavDropdownOpen] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  
  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
     
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsUserMenuOpen(false);
        setIsSearchOpen(false);
        setIsNavDropdownOpen(null);
        setIsMobileSearchOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleQuickAction = useCallback((action: string) => {
    onQuickAction(action);
    setIsUserMenuOpen(false);
  }, [onQuickAction]);

  if (!isLoaded) {
    return <HeaderSkeleton />;
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  return (
    <>
      {/* Professional Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-gray-950/70 border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            
            {/* Left Section - Logo */}
            <div className="hidden lg:flex items-center">
              <Link href="/" className="group transition-opacity hover:opacity-90">
                <Logo />
              </Link>
            </div>

            {/* Center Section - Navigation */}
            <nav className="hidden lg:flex items-center gap-3">
              {PROFESSIONAL_NAV_ITEMS.map((item) => {
                const isLocked = item.requiresAuth && !user;
                return (
                  <div
                    key={item.href}
                    className="relative group"
                    onMouseEnter={() => setIsNavDropdownOpen(item.label)}
                    onMouseLeave={() => setIsNavDropdownOpen(null)}
                  >
                    <Link
                      href={isLocked ? '#auth' : item.href}
                      onClick={(e) => {
                        if (isLocked) {
                          e.preventDefault();
                          onSignIn();
                        }
                      }}
                      className="relative flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg transition-all duration-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                    >
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full font-medium ${
                          item.badge === 'Pro' 
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                            : item.badge === 'Enterprise'
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                        {isLocked && (
                          <svg className="h-3 w-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                        )}
                        <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-4/5 group-hover:left-[10%]"></span>
                    </Link>
                    
                    {isNavDropdownOpen === item.label && (
                      <div className="absolute top-full left-0 mt-1 w-64 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200/50 dark:border-gray-800/50 z-50 animate-in fade-in slide-in-from-top-1 duration-200">
                        <div className="p-4">
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{item.description}</p>
                          <div className="space-y-2">
                            <Link href={`${item.href}/latest`} className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-md transition-colors">
                              Latest Updates
                            </Link>
                            <Link href={`${item.href}/trending`} className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-md transition-colors">
                              Trending Topics
                            </Link>
                            <Link href={`${item.href}/archive`} className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-md transition-colors">
                              Archive
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right Section - Search & User Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Desktop Search */}
              <div className="hidden lg:block relative" ref={searchRef}>
                {isSearchOpen ? (
                  <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-64 pl-10 pr-10 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm text-gray-900"
                      autoFocus
                      onBlur={() => !searchQuery && setIsSearchOpen(false)}
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </form>
                ) : (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
                  >
                    <Search className="h-4 w-4" />
                    <span>Search</span>
                  </button>
                )}
              </div>

              {/* Mobile Controls */}
              <button
                onClick={() => setIsMobileSearchOpen(true)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <Search className="h-5 w-5" />
              </button>

              <button
                onClick={onMobileMenuToggle}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <Menu className="h-5 w-5" />
              </button>

              {/* User Menu */}
              {user ? (
                <div ref={userMenuRef} className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 sm:gap-3 rounded-xl p-1.5 transition-all duration-200 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <div className="relative h-8 w-8 overflow-hidden rounded-full ring-1 ring-gray-200 dark:ring-gray-700">
                      {user.photoURL ? (
                        <Image
                          src={user.photoURL}
                          alt={user.displayName || "User"}
                          fill
                          className="object-cover"
                          sizes="32px"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-400 to-amber-600 text-white text-sm font-medium">
                          {user.displayName?.charAt(0) || "U"}
                        </div>
                      )}
                    </div>
                    <div className="hidden lg:block text-left">
                      <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">{user.displayName || "Professional"}</p>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-500 truncate max-w-[120px]">{user.plan}</span>
                        {user.region && <><span className="text-xs text-gray-400">•</span><span className="text-xs text-gray-500">{user.region.toUpperCase()}</span></>}
                      </div>
                    </div>
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200/50 dark:border-gray-800/50 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      {/* User Info Card */}
                      <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-white dark:ring-gray-950">
                            {user.photoURL ? (
                              <Image src={user.photoURL} alt={user.displayName || "User"} fill className="object-cover" sizes="48px" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-600">
                                <span className="text-sm font-bold text-white">{user.displayName?.slice(0, 2).toUpperCase()}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">{user.displayName || "Professional User"}</p>
                            <p className="truncate text-xs text-gray-600 dark:text-gray-400">{user.email}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">{user.role || 'Member'}</span>
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">{user.plan || 'Free'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 border-b border-gray-100 dark:border-gray-800">
                        <div className="grid grid-cols-2 gap-2">
                          <button onClick={() => handleQuickAction('save_article')} className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                            <Bookmark className="h-4 w-4 text-gray-600 dark:text-gray-400 mb-1" />
                            <span className="text-xs font-medium">Save</span>
                          </button>
                          <button onClick={() => handleQuickAction('download_brief')} className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                            <Download className="h-4 w-4 text-gray-600 dark:text-gray-400 mb-1" />
                            <span className="text-xs font-medium">Brief</span>
                          </button>
                        </div>
                      </div>
                      <div className="py-2">
                        <a href="/dashboard" className="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors" onClick={() => setIsUserMenuOpen(false)}>
                          <User className="h-4 w-4 mr-3 text-gray-400" /> Professional Dashboard
                        </a>
                        <a href="/profile" className="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors" onClick={() => setIsUserMenuOpen(false)}>
                          <Settings className="h-4 w-4 mr-3 text-gray-400" /> Account Settings
                        </a>
                        <a href="/bookmarks" className="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors" onClick={() => setIsUserMenuOpen(false)}>
                          <Bookmark className="h-4 w-4 mr-3 text-gray-400" /> Saved Articles
                        </a>
                        <a href="/subscription" className="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors" onClick={() => setIsUserMenuOpen(false)}>
                          <Briefcase className="h-4 w-4 mr-3 text-gray-400" /> Subscription
                        </a>
                      </div>
                      <div className="border-t border-gray-100 dark:border-gray-800" />
                      <button onClick={async () => { await onSignOut(); setIsUserMenuOpen(false); }} className="flex w-full items-center px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors rounded-b-xl">
                        <LogOut className="h-4 w-4 mr-3" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div ref={userMenuRef} className="relative">
                  <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} 
                    className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg shadow-blue-200/50 hover:shadow-blue-300/50 transition-all duration-300 transform hover:scale-105 border border-blue-400/50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Sign In</span>
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-3 w-80 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/60 dark:border-gray-800/60 z-50 animate-in fade-in slide-in-from-top-2 duration-300 overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 border-b border-blue-100/60">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">Welcome Back</h3>
                            <p className="text-sm text-gray-600 mt-0.5">Sign in to access your educational resources</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-5 space-y-3">
                        <button 
                          onClick={() => { onSignIn('google'); setIsUserMenuOpen(false); }} 
                          className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] group"
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700">Continue with Google</span>
                        </button>
                        
                        <button 
                          onClick={() => { onSignIn('email'); setIsUserMenuOpen(false); }} 
                          className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] group"
                        >
                          <Mail className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
                          <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700">Continue with Email</span>
                        </button>
                        
                        <button 
                          onClick={() => { onSignIn('apple'); setIsUserMenuOpen(false); }} 
                          className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] group"
                        >
                          <svg className="w-5 h-5 text-gray-800" viewBox="0 0 24 24">
                            <path d="M14.94 5.19A4.38 4.38 0 0 0 16 2a4.44 4.44 0 0 0-3 1.52 4.17 4.17 0 0 0-1 3.09 3.69 3.69 0 0 0 2.94-1.42zm2.52 7.44a4.51 4.51 0 0 1 2.16-3.81 4.66 4.66 0 0 0-3.66-2c-1.56-.16-3 .91-3.83.91s-2-.89-3.3-.87a4.92 4.92 0 0 0-4.14 2.53C2.93 12.45 4.24 17 6 19.47c.8 1.21 1.8 2.58 3.12 2.53s1.75-.76 3.28-.76 2 .76 3.3.73 2.22-1.24 3.06-2.45a11 11 0 0 0 1.38-2.85 4.41 4.41 0 0 1-2.68-4.04z"/>
                          </svg>
                          <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700">Continue with Apple</span>
                        </button>
                      </div>
                      
                      <div className="bg-gray-50 px-5 py-4 border-t border-gray-100">
                        <p className="text-xs text-gray-500 text-center leading-relaxed">
                          By signing in, you agree to our 
                          <button className="text-blue-600 hover:text-blue-700 font-medium mx-1">Terms of Service</button>
                          and 
                          <button className="text-blue-600 hover:text-blue-700 font-medium mx-1">Privacy Policy</button>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search Dropdown */}
      {isMobileSearchOpen && (
        <div className="lg:hidden fixed top-16 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-lg">
          <div className="flex items-center gap-3 p-4 max-w-7xl mx-auto">
            <form onSubmit={handleSearch} className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </form>
            <button
              onClick={() => setIsMobileSearchOpen(false)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors shrink-0"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Spacer */}
      <div className="h-16"></div>
    </>
  );
};



export const NotificationBadge: React.FC<{
  count: number;
  onClick: () => void;
}> = ({ count, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
    >
      <Bell className="h-5 w-5" />
      {count > 0 && (
        <>
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center ring-2 ring-white dark:ring-gray-950 animate-pulse">
            {count > 9 ? '9+' : count}
          </span>
        </>
      )}
    </button>
  );
};

export const PlanUpgradeBanner: React.FC<{
  currentPlan: string;
  onUpgrade: () => void;
}> = ({ currentPlan, onUpgrade }) => {
  if (currentPlan === 'enterprise' || currentPlan === 'corporate') return null;

  return (
    <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-950/50 dark:to-indigo-950/50 border-y border-blue-200/50 dark:border-blue-800/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
            <p className="text-sm text-blue-800 dark:text-blue-300">
              Upgrade to <span className="font-semibold">Pro</span> for advanced analytics and unlimited access
            </p>
          </div>
          <button
            onClick={onUpgrade}
            className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            Upgrade Now →
          </button>
        </div>
      </div>
    </div>
  );
};