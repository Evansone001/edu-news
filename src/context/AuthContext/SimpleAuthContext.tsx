"use client";

import React, { createContext, useState } from 'react';

interface SimpleUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface SimpleAuthContextType {
  user: SimpleUser | null;
  isLoading: boolean;
  error: { message: string; type: string } | null;
  isAuthenticated: boolean;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
  resetAuthState: () => void;
}

export const SimpleAuthContext = createContext<SimpleAuthContextType | undefined>(undefined);

export function SimpleAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SimpleUser | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<{ message: string; type: string } | null>(null);

  const signUpWithEmail = async (email: string, password: string) => {
    console.log('Sign up with email:', email);
  };

  const signUpWithGoogle = async () => {
    console.log('Sign up with Google');
  };

  const signInWithEmail = async (email: string, password: string) => {
    console.log('Sign in with email:', email);
  };

  const signInWithGoogle = async () => {
    console.log('Sign in with Google');
  };

  const signOut = async () => {
    setUser(null);
  };

  const clearError = () => {
    setError(null);
  };

  const resetAuthState = () => {
    setUser(null);
    setLoading(false);
    setError(null);
  };

  const value: SimpleAuthContextType = {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    signUpWithEmail,
    signUpWithGoogle,
    signInWithEmail,
    signInWithGoogle,
    signOut,
    clearError,
    resetAuthState,
  };

  return <SimpleAuthContext.Provider value={value}>{children}</SimpleAuthContext.Provider>;
}

export function useSimpleAuthContext() {
  const context = React.useContext(SimpleAuthContext);
  if (context === undefined) {
    throw new Error('useSimpleAuthContext must be used within a SimpleAuthProvider');
  }
  return context;
}
