import { useState, useCallback } from 'react';
import type { AuthModalStep } from '@/components/layout/Header/types';

export function useAuthModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authStep, setAuthStep] = useState<AuthModalStep>('INITIAL');

  const openModal = useCallback((step: AuthModalStep = 'INITIAL') => {
    setAuthStep(step);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setAuthStep('INITIAL'), 300);
  }, []);

  return {
    isModalOpen,
    authStep,
    openModal,
    closeModal,
    setAuthStep
  };
}