import Link from "next/link";

export const NavigationLinks = ({ onFollow }: { onFollow: () => void }) => (
  <div className="hidden md:flex items-center space-x-6">
    <Link 
      href="/about" 
      className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
    >
      About
    </Link>
    <Link 
      href="/contact" 
      className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
    >
      Contact
    </Link>
  </div>
);