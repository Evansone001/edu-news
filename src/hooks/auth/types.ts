export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  // Add other user properties as needed
}

export interface AuthError {
  type: 'signin' | 'signup' | 'signout' | 'google' | 'unknown';
  message: string;
  code: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: AuthError | null;
  isAuthenticated: boolean;
}

export interface AuthContextType {
  // State
  user: User | null;
  isLoading: boolean;
  error: AuthError | null;
  isAuthenticated: boolean;

  // Sign Up
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithGoogle: () => Promise<void>;

  // Sign In
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;

  // Sign Out
  signOut: () => Promise<void>;

  // Reset
  clearError: () => void;
  resetAuthState: () => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface AuthFormData {
  email: string;
  password: string;
  name?: string;
}

export const AUTH_ERROR_CODES = {
  // Common errors
  UNKNOWN_ERROR: 'auth/unknown-error',
  INVALID_CREDENTIALS: 'auth/invalid-credential',
  USER_DISABLED: 'auth/user-disabled',
  USER_NOT_FOUND: 'auth/user-not-found',
  WRONG_PASSWORD: 'auth/wrong-password',
  
  // Sign up specific
  EMAIL_ALREADY_IN_USE: 'auth/email-already-in-use',
  INVALID_EMAIL: 'auth/invalid-email',
  OPERATION_NOT_ALLOWED: 'auth/operation-not-allowed',
  WEAK_PASSWORD: 'auth/weak-password',
  
  // Other possible errors
  TOO_MANY_ATTEMPTS: 'auth/too-many-requests',
  NETWORK_ERROR: 'auth/network-request-failed',
  POPUP_CLOSED: 'auth/popup-closed-by-user',
  ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL: 'auth/account-exists-with-different-credential'
} as const;

export type AuthErrorCode = keyof typeof AUTH_ERROR_CODES;
