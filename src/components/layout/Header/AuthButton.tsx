interface AuthButtonsProps {
  onSignIn: () => void;
  onGetStarted: () => void;
}

export function AuthButtons({ onSignIn, onGetStarted }: AuthButtonsProps) {
  return (
    <div className="hidden items-center gap-2 sm:gap-4 md:flex">
      <button
        onClick={onSignIn}
        className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors duration-200"
      >
        Sign In
      </button>
      <button
        onClick={onGetStarted}
        className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Get Started
        <span className="ml-1.5 inline-block">→</span>
      </button>
    </div>
  );
}
