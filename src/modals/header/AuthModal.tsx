import React from 'react';
import { ModalBackdrop, InitialAuthModal, SignInModal,  EmailAuthModal,  } from './modals';
import { AuthModalStep } from '../../components/layout/Header/types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  step: AuthModalStep;
  onChangeStep: (step: AuthModalStep) => void;
}

export function AuthModal({ isOpen, onClose, step, onChangeStep }: AuthModalProps) {
  const renderStep = () => {
    switch (step) {
      case 'INITIAL':
        return (
          <InitialAuthModal
            onClose={onClose}
            onSignInWithGoogle={() => onChangeStep('SIGN_IN')}
            onSignIn={() => onChangeStep('SIGN_IN')}
            onSignUpWithEmail={() => onChangeStep('SIGN_UP_EMAIL')}
          />
        );
      case 'SIGN_IN':
        return (
          <SignInModal
            onClose={onClose}
            onSignInWithGoogle={() => {/* Handle Google sign in */}}
            onSignInWithEmail={() => onChangeStep('SIGN_IN_EMAIL')}
            onCreateAccount={() => onChangeStep('SIGN_UP_EMAIL')}
          />
        );
      case 'SIGN_UP_EMAIL':
      case 'SIGN_IN_EMAIL':
        return (
          <EmailAuthModal
            type={step === 'SIGN_UP_EMAIL' ? 'SIGN_UP' : 'SIGN_IN'}
            onSubmit={() => {/* Handle form submission */}}
            email=""
            onEmailChange={() => {/* Handle email change */}}
            password=""
            onPasswordChange={() => {/* Handle password change */}}
            errors={[]}
            isLoading={false}
            onBack={() => onChangeStep('INITIAL')}
          />
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <ModalBackdrop isOpen={isOpen} onClose={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          {renderStep()}
        </div>
      </div>
    </>
  );
}

export default AuthModal;