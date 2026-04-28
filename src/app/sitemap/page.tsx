'use client';

import Link from 'next/link';

const SITEMAP_SECTIONS = [
    {
        title: 'Main Pages',
        links: [
            { name: 'Home', href: '/' },
            { name: 'Articles', href: '/blog' },
            { name: 'About Us', href: '/about' },
            { name: 'Contact Us', href: '/contact' },
        ]
    },
    {
        title: 'Categories',
        links: [
            { name: 'Education Technology', href: '/blog?category=education-technology' },
            { name: 'Teaching Methods', href: '/blog?category=teaching-methods' },
            { name: 'Study Abroad', href: '/blog?category=study-abroad' },
            { name: 'Scholarships', href: '/blog?category=scholarships' },
        ]
    },
    {
        title: 'Information',
        links: [
            { name: 'Privacy Policy', href: '/privacy' },
            { name: 'Terms of Service', href: '/terms' },
        ]
    }
];

export default function SitemapPage() {
    return (
        <div className="min-h-screen bg-white pt-20 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Sitemap</h1>
                <p className="text-gray-600 mb-12">
                    Navigate through our education news platform.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {SITEMAP_SECTIONS.map((section) => (
                        <div key={section.title}>
                            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">
                                {section.title}
                            </h2>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
