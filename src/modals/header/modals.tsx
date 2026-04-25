import { ErrorType } from "@/components/layout/Header/types";
import { BiErrorAlt } from "react-icons/bi";
import { BsChevronLeft } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { IoMailOutline } from "react-icons/io5";
import { VscClose } from "react-icons/vsc";

export const ModalBackdrop = ({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void 
}) => (
  <div
    onClick={onClose}
    className={`fixed inset-0 z-40 transition-all duration-300 ease-out ${
      isOpen
        ? "bg-gray-900/80 backdrop-blur-md opacity-100"
        : "bg-transparent backdrop-blur-0 opacity-0 pointer-events-none"
    }`}
    aria-hidden="true"
  />
);

export const ModalCloseButton = ({ onClose }: { onClose: () => void }) => (
  <button
    onClick={onClose}
    className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
    aria-label="Close modal"
  >
    <VscClose className="w-5 h-5" />
  </button>
);

export const AuthForm = ({
  type,
  onSubmit,
  email,
  onEmailChange,
  password,
  onPasswordChange,
  errors,
  isLoading
}: {
  type: "SIGN_UP" | "SIGN_IN";
  onSubmit: (e: React.FormEvent) => void;
  email: string;
  onEmailChange: (value: string) => void;
  password: string;
  onPasswordChange: (value: string) => void;
  errors: ErrorType[];
  isLoading?: boolean;
}) => {
  const getErrorMessage = (error: ErrorType): string => {
    const messages = {
      INVALID_CREDENTIALS: "Invalid email or password",
      EMAIL_IN_USE: "Email already in use",
      WEAK_PASSWORD: "Password should be at least 6 characters"
    };
    return messages[error];
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 w-full max-w-sm mx-auto">
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-400 outline-none transition-all bg-white shadow-sm"
          placeholder="Enter your email address"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-400 outline-none transition-all bg-white shadow-sm"
          placeholder="Enter your password"
          required
          minLength={6}
        />
      </div>

      {errors.length > 0 && (
        <div className="space-y-2">
          {errors.map((error) => (
            <div
              key={error}
              className="flex items-center space-x-2 text-red-600 bg-red-50 border border-red-200 p-3 rounded-xl"
            >
              <BiErrorAlt className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{getErrorMessage(error)}</span>
            </div>
          ))}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl shadow-amber-200/50 hover:shadow-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 border border-amber-400/50 ${
          isLoading ? "opacity-70 cursor-not-allowed transform-none" : ""
        }`}
      >
        {isLoading ? "Processing..." : type === "SIGN_UP" ? "Create Account" : "Sign In"}
      </button>
    </form>
  );
};

export const InitialAuthModal = ({
  onClose,
  onBack,
  onSignInWithGoogle,
  onSignIn,
  onSignUpWithEmail,
}: {
  onClose: () => void;
  onBack?: () => void;
  onSignInWithGoogle: () => void;
  onSignIn: () => void;
  onSignUpWithEmail: () => void;
}) => (
  <div className="p-8">
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Join Sheria News</h2>
      <p className="text-gray-600">
        Access legal insights, personalize your feed, and follow legal topics
      </p>
    </div>
    
    <div className="space-y-4">
      <button
        onClick={onSignInWithGoogle}
        className="w-full flex items-center justify-center gap-3 px-6 py-3.5 border-2 border-gray-200 bg-white rounded-xl hover:border-amber-400 hover:bg-amber-50 transition-all duration-300 transform hover:scale-[1.02] shadow-sm hover:shadow-md group"
      >
        <FcGoogle className="w-5 h-5" />
        <span className="font-semibold text-gray-700 group-hover:text-amber-700">Continue with Google</span>
      </button>
      
      <button
        onClick={onSignUpWithEmail}
        className="w-full flex items-center justify-center gap-3 px-6 py-3.5 border-2 border-gray-200 bg-white rounded-xl hover:border-amber-400 hover:bg-amber-50 transition-all duration-300 transform hover:scale-[1.02] shadow-sm hover:shadow-md group"
      >
        <IoMailOutline className="w-5 h-5 text-gray-500 group-hover:text-amber-600" />
        <span className="font-semibold text-gray-700 group-hover:text-amber-700">Continue with Email</span>
      </button>
    </div>
    
    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
      <p className="text-gray-600">
        Already have an account?{" "}
        <button
          onClick={onSignIn}
          className="text-amber-600 font-semibold hover:text-amber-700 transition-colors"
        >
          Sign In
        </button>
      </p>
    </div>
  </div>
);

export const SignInModal = ({
  onClose,
  onBack,
  onSignInWithGoogle,
  onSignInWithEmail,
  onCreateAccount,
}: {
  onClose: () => void;
  onBack?: () => void;
  onSignInWithGoogle: () => void;
  onSignInWithEmail: () => void;
  onCreateAccount: () => void;
}) => (
  <div className="p-8">
    {onBack && (
      <button
        onClick={onBack}
        className="flex items-center text-amber-600 hover:text-amber-700 mb-6 transition-colors"
      >
        <BsChevronLeft className="w-4 h-4 mr-2" />
        Back
      </button>
    )}
    
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
      <p className="text-gray-600">
        Sign in to access your personalized legal feed
      </p>
    </div>
    
    <div className="space-y-4">
      <button
        onClick={onSignInWithGoogle}
        className="w-full flex items-center justify-center gap-3 px-6 py-3.5 border-2 border-gray-200 bg-white rounded-xl hover:border-amber-400 hover:bg-amber-50 transition-all duration-300 transform hover:scale-[1.02] shadow-sm hover:shadow-md group"
      >
        <FcGoogle className="w-5 h-5" />
        <span className="font-semibold text-gray-700 group-hover:text-amber-700">Continue with Google</span>
      </button>
      
      <button
        onClick={onSignInWithEmail}
        className="w-full flex items-center justify-center gap-3 px-6 py-3.5 border-2 border-gray-200 bg-white rounded-xl hover:border-amber-400 hover:bg-amber-50 transition-all duration-300 transform hover:scale-[1.02] shadow-sm hover:shadow-md group"
      >
        <IoMailOutline className="w-5 h-5 text-gray-500 group-hover:text-amber-600" />
        <span className="font-semibold text-gray-700 group-hover:text-amber-700">Continue with Email</span>
      </button>
    </div>
    
    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
      <p className="text-gray-600">
        No account?{" "}
        <button
          onClick={onCreateAccount}
          className="text-amber-600 font-semibold hover:text-amber-700 transition-colors"
        >
          Create one
        </button>
      </p>
    </div>
  </div>
);

export const EmailAuthModal = ({
  type,
  onSubmit,
  email,
  onEmailChange,
  password,
  onPasswordChange,
  errors,
  isLoading,
  onBack,
}: {
  type: "SIGN_UP" | "SIGN_IN";
  onSubmit: (e: React.FormEvent) => void;
  email: string;
  onEmailChange: (value: string) => void;
  password: string;
  onPasswordChange: (value: string) => void;
  errors: ErrorType[];
  isLoading?: boolean;
  onBack?: () => void;
}) => (
  <div className="p-8">
    {onBack && (
      <button
        onClick={onBack}
        className="flex items-center text-amber-600 hover:text-amber-700 mb-6 transition-colors"
      >
        <BsChevronLeft className="w-4 h-4 mr-2" />
        All sign up options
      </button>
    )}
    
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
        <IoMailOutline className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        {type === "SIGN_UP" ? "Create Your Account" : "Sign In to Your Account"}
      </h2>
      <p className="text-gray-600">
        {type === "SIGN_UP" 
          ? "Enter your email to join our legal community"
          : "Enter your credentials to access your account"}
      </p>
    </div>
    
    <AuthForm
      type={type}
      onSubmit={onSubmit}
      email={email}
      onEmailChange={onEmailChange}
      password={password}
      onPasswordChange={onPasswordChange}
      errors={errors}
      isLoading={isLoading}
    />
  </div>
);

