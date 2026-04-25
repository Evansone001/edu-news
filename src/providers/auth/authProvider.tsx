"use client";

import { useAuthReducer } from "@/hooks/auth/useAuthREducer";
import { useAuthOperations } from "@/hooks/auth/useAuthOperations";
import { useEffect, useCallback } from "react";
import type { User,  AuthContextType  } from "@/hooks/auth/types";
import { AuthContext } from '@/context/AuthContext/AuthContext';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { state, actions } = useAuthReducer();
  const {  
    signUpWithEmail,
    signInWithEmail,
    signUpWithGoogle,
    signInWithGoogle,
    signOut,
    setupAuthStateListener,
  } = useAuthOperations();

  // Handle authentication state changes
  useEffect(() => {
    const unsubscribe = setupAuthStateListener((user: User | null) => {
      actions.setUser(user);
      actions.setLoading(false);
    });

    return () => unsubscribe();
  }, [setupAuthStateListener, actions]);

  // Wrap operations with loading and error handling
  const wrappedOperation = useCallback(
    async <T,>(
      operation: () => Promise<T>,
      errorType: 'signup' | 'signin' | 'google' | 'signout'
    ): Promise<T> => {
      try {
        actions.setLoading(true);
        actions.clearError();
        const result = await operation();
        actions.setLoading(false);
        return result;
      } catch (error: any) {
        actions.setLoading(false);
        actions.setError({
          code: error.code,
          message: error.message,
          type: errorType,
        });
        throw error;
      }
    },
    [actions]
  );

  // Public API methods
  const handleSignUpWithEmail = useCallback(
    (email: string, password: string) =>
      wrappedOperation(() => signUpWithEmail(email, password), 'signup'),
    [wrappedOperation, signUpWithEmail]
  );

  const handleSignInWithEmail = useCallback(
    (email: string, password: string) =>
      wrappedOperation(() => signInWithEmail(email, password), 'signin'),
    [wrappedOperation, signInWithEmail]
  );

  const handleSignUpWithGoogle = useCallback(
    () => wrappedOperation(signUpWithGoogle, 'google'),
    [wrappedOperation, signUpWithGoogle]
  );

  const handleSignInWithGoogle = useCallback(
    () => wrappedOperation(signInWithGoogle, 'google'),
    [wrappedOperation, signInWithGoogle]
  );

  const handleSignOut = useCallback(
    () => wrappedOperation(signOut, 'signout'),
    [wrappedOperation, signOut]
  );

  const handleClearError = useCallback(() => {
    actions.clearError();
  }, [actions]);

  const handleResetAuthState = useCallback(() => {
    actions.resetState();
  }, [actions]);

  const value: AuthContextType = {
    // State
    user: state.user,
    isLoading: state.isLoading,
    error: state.error,
    isAuthenticated: state.isAuthenticated,

    // Sign Up
    signUpWithEmail: handleSignUpWithEmail,
    signUpWithGoogle: handleSignUpWithGoogle,

    // Sign In
    signInWithEmail: handleSignInWithEmail,
    signInWithGoogle: handleSignInWithGoogle,

    // Sign Out
    signOut: handleSignOut,

    // Reset
    clearError: handleClearError,
    resetAuthState: handleResetAuthState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}