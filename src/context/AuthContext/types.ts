export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export type AuthError = {
  code: string;
  message: string;
  type: 'SIGN_UP' | 'SIGN_IN' | 'GOOGLE' | 'LOGOUT';
};

export type AuthState = {
  user: User | null;
  isLoading: boolean;
  error: AuthError | null;
  isAuthenticated: boolean;
};

export type AuthFormData = {
  email: string;
  password: string;
};

export type AuthProviderProps = {
  children: React.ReactNode;
};

export type AuthContextType = {
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
};

// Error codes mapping
export const AUTH_ERROR_CODES = {
  EMAIL_EXISTS: 'auth/email-already-in-use',
  INVALID_EMAIL: 'auth/invalid-email',
  USER_DISABLED: 'auth/user-disabled',
  USER_NOT_FOUND: 'auth/user-not-found',
  WRONG_PASSWORD: 'auth/wrong-password',
  WEAK_PASSWORD: 'auth/weak-password',
  NETWORK_FAILED: 'auth/network-request-failed',
  TOO_MANY_REQUESTS: 'auth/too-many-requests',
  OPERATION_NOT_ALLOWED: 'auth/operation-not-allowed',
  UNKNOWN_ERROR: 'auth/unknown-error',
  PROVIDER_ERROR: 'auth/provider-error',
} as const;

export type AuthErrorCode = typeof AUTH_ERROR_CODES[keyof typeof AUTH_ERROR_CODES];