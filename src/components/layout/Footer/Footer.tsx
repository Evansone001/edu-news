import Link from 'next/link';
import { 
  Twitter, 
  Linkedin, 
  Github, 
  Mail, 
  Shield, 
  Scale, 
  FileText,
  ChevronRight
} from 'lucide-react';

interface FooterProps {
  className?: string;
}

export const ProfessionalFooter: React.FC<FooterProps> = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
  ];

  const legalLinks = [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Cookies', href: '/cookies' },
    { label: 'Disclaimer', href: '/disclaimer' },
  ];

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/edunewske', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/edunewske', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/edunewske', label: 'GitHub' },
    { icon: Mail, href: 'mailto:hello@edunews.co.ke', label: 'Email' },
  ];

  return (
    <footer className={`relative bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-gray-900 dark:text-white overflow-hidden border-t border-gray-200/50 dark:border-gray-800/50 ${className}`}>
      {/* Subtle gradient background */}
      <div 
        aria-hidden="true"
        className="absolute inset-0 opacity-10"
        style={{
          background: `
            radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 90% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)
          `,
        }}
      />

      {/* Subtle floating shapes */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-20 w-16 h-16 border border-blue-400/10 rounded-full" />
        <div className="absolute bottom-10 left-20 w-12 h-12 border border-indigo-400/10 rounded-lg rotate-45" />
      </div>

      {/* Subtle glow orbs */}
      <div aria-hidden="true">
        <div
          className="glow-orb"
          style={{
            width: 200,
            height: 200,
            top: -50,
            right: -50,
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)",
          }}
        />
        <div
          className="glow-orb"
          style={{
            width: 150,
            height: 150,
            bottom: -40,
            left: -40,
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Subtle grid pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        {/* Main Row - All Elements */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-12">
          
          {/* Brand - Takes more space on desktop */}
          <div className="lg:flex-1">
            <Link href="/" className="inline-flex items-center space-x-3 group mb-4 lg:mb-0">
              <img 
                src="/images/edunews-logo.svg" 
                alt="EDUNEWS Logo" 
                className="h-10 w-auto transition-transform group-hover:scale-105"
              />
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-sm hidden lg:block">
              Your trusted source for education insights, teaching resources, and learning materials.
            </p>
          </div>

          {/* Links Container - Flex container for both link sections */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 lg:gap-16">
            
            {/* Quick Links */}
            <div className="pl-4 lg:pl-8">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center group"
                    >
                      <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div className="pl-4 lg:pl-8">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                Policies
              </h3>
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center group"
                    >
                      <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Links - Separate section */}
          <div className="lg:text-right">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Connect
            </h3>
            <div className="flex lg:justify-end space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright - Below */}
        <div className="mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-700/50 flex justify-center items-center w-full">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            &copy; {currentYear} EDU NEWS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ProfessionalFooter;