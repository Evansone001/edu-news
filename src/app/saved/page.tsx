'use client';

import Link from 'next/link';

export default function SavedPage() {
    return (
        <div className="min-h-screen bg-white pt-20 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">Saved Articles</h1>

                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-12">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">No saved articles</h2>
                    <p className="text-gray-600 mb-8 max-w-sm mx-auto">
                        Articles you save will appear here. Start exploring our legal intelligence library.
                    </p>
                    <Link href="/" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
                        Browse Articles
                    </Link>
                </div>
            </div>
        </div>
    );
}
