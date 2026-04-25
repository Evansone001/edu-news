import { useCallback, useMemo, useState, useContext } from "react";
import { AuthModalStep, ErrorType, HeaderProps } from "./types";
import { EmailAuthModal, InitialAuthModal, ModalBackdrop, ModalCloseButton, SignInModal } from "@/modals/header/modals";
import { useSimpleAuthContext } from "@/context/AuthContext/SimpleAuthContext";
import { MobileNavigation } from "./MobileNav";
import { ProfessionalHeader } from "./DesktopNavigation";
import { ProfessionalContext } from "@/context/global";

export default  function Header({}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const context = useSimpleAuthContext();
  
  if (!context) {
    throw new Error('Header must be used within an AppContextProvider');
  }
  
  const {
    user: authUser,
    signInWithGoogle,
    signUpWithGoogle,
    signOut: logout,
    signUpWithEmail,
    signInWithEmail,
    isLoading,
    error,
    isAuthenticated
  } = context;
  
  // Local state for form fields
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [successLogin, setSuccessLogin] = useState(false);
  

  const { user: professionalUser, language, updateLanguage } = useContext(ProfessionalContext);
  
  // Use the auth user for authentication logic
  const user = authUser;
  
  // Constants
  const DEFAULT_LANGUAGES = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];
  
  // Handler functions
  const handleQuickAction = (action: string) => {
    console.log('Quick action:', action);
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  // Handle form submissions
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUpWithEmail(registerEmail, registerPassword);
      setSuccessLogin(true);
    } catch (error) {
      console.error('Sign up error:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmail(loginEmail, loginPassword);
      setSuccessLogin(true);
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  
  // Map error messages
  const messageerr = error?.type === 'signup' ? error.message : '';
  const messageerr1 = error?.type === 'signin' ? error.message : '';
  const messageerr2 = ''; // Add this if needed for other error types

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authStep, setAuthStep] = useState<AuthModalStep>("INITIAL");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const activeErrors = useMemo(() => {
    const errors: ErrorType[] = [];
    if (messageerr) errors.push("INVALID_CREDENTIALS");
    if (messageerr1) errors.push("EMAIL_IN_USE");
    if (messageerr2) errors.push("WEAK_PASSWORD");
    return errors;
  }, [messageerr, messageerr1, messageerr2]);

  const handleFollowClick = useCallback(async () => {
    if (!user) {
      setIsModalOpen(true);
      setAuthStep("INITIAL");
      return;
    }

    // Mock implementation - replace with actual backend call
    console.log('User followed blog:', user.email);
    setIsFollowing((prev) => !prev);
  }, [user]);

  const handleSignInClick = () => {
    setIsModalOpen(true);
    setAuthStep("SIGN_IN");
  };

  const handleGetStartedClick = () => {
    setIsModalOpen(true);
    setAuthStep("INITIAL");
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    // Reset after animation
    setTimeout(() => setAuthStep("INITIAL"), 300);
  };

  const renderModalContent = () => {
    const commonProps = {
      onBack: () => setAuthStep("INITIAL"),
      onClose: handleModalClose,
    };

    switch (authStep) {
      case "INITIAL":
        return (
          <InitialAuthModal
            {...commonProps}
            onSignInWithGoogle={signUpWithGoogle}
            onSignIn={() => setAuthStep("SIGN_IN")}
            onSignUpWithEmail={() => setAuthStep("SIGN_UP_EMAIL")}
          />
        );
      case "SIGN_IN":
        return (
          <SignInModal
            {...commonProps}
            onSignInWithGoogle={signInWithGoogle}
            onSignInWithEmail={() => setAuthStep("SIGN_IN_EMAIL")}
            onCreateAccount={() => setAuthStep("INITIAL")}
          />
        );
      case "SIGN_UP_EMAIL":
        return (
          <EmailAuthModal
            {...commonProps}
            type="SIGN_UP"
            onSubmit={handleSignUp}
            email={registerEmail}
            onEmailChange={setRegisterEmail}
            password={registerPassword}
            onPasswordChange={setRegisterPassword}
            errors={activeErrors}
            isLoading={isLoading}
          />
        );
      case "SIGN_IN_EMAIL":
        return (
          <EmailAuthModal
            {...commonProps}
            type="SIGN_IN"
            onSubmit={handleLogin}
            email={loginEmail}
            onEmailChange={setLoginEmail}
            password={loginPassword}
            onPasswordChange={setLoginPassword}
            errors={activeErrors}
            isLoading={isLoading}
          />
        );
    }
  };

  return (
    <>
      <ProfessionalHeader
        user={user}
        isFollowing={false}
        currentLanguage={language}
        availableLanguages={DEFAULT_LANGUAGES}
        onFollow={() => {}}
        onSignOut={logout}
        onSignIn={handleSignInClick}
        onGetStarted={() => {}}
        onLanguageChange={updateLanguage}
        onQuickAction={handleQuickAction}
        onMobileMenuToggle={toggleMobileMenu}
      />

      {/* Mobile Navigation - positioned outside header for proper visibility */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        isAuthenticated={!!user}
        onSignIn={handleSignInClick}
        onGetStarted={handleGetStartedClick}
        onSignOut={logout}
        isFollowing={isFollowing}
        onFollowClick={handleFollowClick}
      />

      {/* Auth Modal */}
      {isModalOpen && (
        <>
          <ModalBackdrop isOpen={isModalOpen} onClose={handleModalClose} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              <ModalCloseButton onClose={handleModalClose} />
              {renderModalContent()}
            </div>
          </div>
        </>
      )}
    </>
  );
}
