"use client";

import { useReducer, useCallback } from 'react';
import type { User, AuthError, AuthState } from './types'

type AuthAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: AuthError | null }
  | { type: 'RESET_STATE' }
  | { type: 'CLEAR_ERROR' };

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,  // copy all existing state properties
        user: action.payload,  // 2. update only the user property
        isAuthenticated: !!action.payload,  // 3. update isAuthenticated based on user
      };
    case 'SET_LOADING':
      return {
        ...state,  // copy all existing state properties
        isLoading: action.payload,  // 2. update only the isLoading property
      };
    case 'SET_ERROR':
      return {
        ...state,  // copy all existing state properties
        error: action.payload,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'RESET_STATE':
      return initialState;
    default:
      return state;
  }
}  

export function useAuthReducer() {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const setUser = useCallback((user: User | null) => {
    dispatch({ type: 'SET_USER', payload: user });
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, []);

  const setError = useCallback((error: AuthError | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  const resetState = useCallback(() => {
    dispatch({ type: 'RESET_STATE' });
  }, []);

  return {
    state,
    actions: {
      setUser,
      setLoading,
      setError,
      clearError,
      resetState,
    },
  };
}