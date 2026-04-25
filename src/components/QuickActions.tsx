'use client';

import { Share2, Bookmark, ArrowUp } from 'lucide-react';

interface QuickActionsProps {
  variant?: 'sidebar' | 'floating' | 'minimal';
  className?: string;
}

export default function QuickActions({ variant = 'sidebar', className = '' }: QuickActionsProps) {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: document.title,
                url: window.location.href,
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    // Floating variant (fixed bottom-right)
    if (variant === 'floating') {
        return (
            <div className={`fixed bottom-6 right-6 z-50 flex flex-col gap-3 ${className}`}>
                <button
                    onClick={handleShare}
                    className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-lg bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 group"
                    title="Share Article"
                >
                    <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
                <button
                    className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-lg bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 group"
                    title="Save for Later"
                >
                    <Bookmark className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
                <button
                    onClick={scrollToTop}
                    className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-lg bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 group"
                    title="Back to Top"
                >
                    <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                </button>
            </div>
        );
    }

    // Minimal variant (scroll-to-top only)
    if (variant === 'minimal') {
        return (
            <button
                onClick={scrollToTop}
                className={`w-12 h-12 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-lg bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 group ${className}`}
                title="Back to Top"
            >
                <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            </button>
        );
    }

    // Sidebar variant (default) - flexible width

    return (
        <aside className={`flex flex-col gap-4 ${className}`}>
            <div className="flex flex-col gap-4">
                <button
                    onClick={handleShare}
                    className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 group"
                    title="Share Article"
                >
                    <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
                <button
                    className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 group"
                    title="Save for Later"
                >
                    <Bookmark className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
                <div className="h-px w-8 bg-gray-100 dark:bg-gray-800 mx-auto my-2" />
                <button
                    onClick={scrollToTop}
                    className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 group"
                    title="Back to Top"
                >
                    <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                </button>
            </div>
        </aside>
    );
}
