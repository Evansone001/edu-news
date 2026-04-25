"use client";

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AuthError, AUTH_ERROR_CODES, User } from './types';

// Mock auth implementation - replace with your actual auth provider
const mockUser: User = {
  uid: 'mock-user-id',
  email: 'user@example.com',
  displayName: 'Demo User',
  photoURL: null,
};

let currentUser: User | null = null;

export function useAuthOperations() {
  const router = useRouter();

  const handleAuthError = useCallback((error: any, type: AuthError['type']): AuthError => {
    const errorCode = error.code || AUTH_ERROR_CODES.UNKNOWN_ERROR;
    
    const errorMessages: Record<string, string> = {
      [AUTH_ERROR_CODES.EMAIL_ALREADY_IN_USE]: 'This email is already registered.',
      [AUTH_ERROR_CODES.INVALID_EMAIL]: 'Please enter a valid email address.',
      [AUTH_ERROR_CODES.USER_DISABLED]: 'This account has been disabled.',
      [AUTH_ERROR_CODES.USER_NOT_FOUND]: 'No account found with this email.',
      [AUTH_ERROR_CODES.WRONG_PASSWORD]: 'Incorrect password. Please try again.',
      [AUTH_ERROR_CODES.WEAK_PASSWORD]: 'Password should be at least 6 characters.',
      [AUTH_ERROR_CODES.NETWORK_ERROR]: 'Network error. Please check your connection.',
      [AUTH_ERROR_CODES.TOO_MANY_ATTEMPTS]: 'Too many attempts. Please try again later.',
      [AUTH_ERROR_CODES.OPERATION_NOT_ALLOWED]: 'This operation is not allowed.',
      [AUTH_ERROR_CODES.UNKNOWN_ERROR]: 'An unknown error occurred. Please try again.',
    };

    return {
      code: errorCode,
      message: errorMessages[errorCode] || error.message || 'An error occurred',
      type,
    };
  }, []);

  const signUpWithEmail = useCallback(async (
    email: string, 
    password: string
  ): Promise<void> => {
    // Mock implementation - replace with actual auth
    console.log('Sign up with email:', email);
    currentUser = { ...mockUser, email };
    router.push('/SignupCo');
  }, [router]);

  const signInWithEmail = useCallback(async (
    email: string, 
    password: string
  ): Promise<void> => {
    // Mock implementation - replace with actual auth
    console.log('Sign in with email:', email);
    currentUser = { ...mockUser, email };
  }, []);

  const signUpWithGoogle = useCallback(async (): Promise<void> => {
    // Mock implementation - replace with actual auth
    console.log('Sign up with Google');
    currentUser = mockUser;
    router.push('/SignupCo');
  }, [router]);

  const signInWithGoogle = useCallback(async (): Promise<void> => {
    // Mock implementation - replace with actual auth
    console.log('Sign in with Google');
    currentUser = mockUser;
  }, []);

  const signOutUser = useCallback(async (): Promise<void> => {
    // Mock implementation - replace with actual auth
    currentUser = null;
  }, []);

  const setupAuthStateListener = useCallback((
    onUserChanged: (user: User | null) => void
  ) => {
    // Mock implementation - replace with actual auth
    onUserChanged(currentUser);
    
    // Return unsubscribe function
    return () => {};
  }, []);

  return {
    signUpWithEmail,
    signInWithEmail,
    signUpWithGoogle,
    signInWithGoogle,
    signOut: signOutUser,
    setupAuthStateListener,
  };
}