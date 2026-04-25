'use client';

import { useEffect, useState } from 'react';
import { List } from 'lucide-react';

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

export default function TableOfContents({ contentHtml }: { contentHtml: string }) {
    const [toc, setToc] = useState<TOCItem[]>([]);
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        // Basic parser to find H2 and H3 tags in the HTML string
        // In a real app, this might be better handled by a library or the CMS
        const parser = new DOMParser();
        const doc = parser.parseFromString(contentHtml, 'text/html');
        const headings = Array.from(doc.querySelectorAll('h2, h3'));

        const items: TOCItem[] = headings.map((heading, index) => {
            const text = heading.textContent || '';
            const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
            heading.id = id; // This doesn't affect the original HTML yet, but good for reference
            return {
                id: id || `section-${index}`,
                text,
                level: parseInt(heading.tagName[1]),
            };
        });

        setToc(items);

        // Setup Intersection Observer to highlight active heading
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-10% 0% -80% 0%' }
        );

        // Need to observe the actual elements in the DOM
        const domHeadings = document.querySelectorAll('article h2, article h3');
        domHeadings.forEach((h) => observer.observe(h));

        return () => observer.disconnect();
    }, [contentHtml]);

    if (toc.length === 0) return null;

    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto hidden xl:block w-72 transition-colors">
            <div className="flex items-center gap-2 mb-4 text-gray-900 dark:text-white font-bold">
                <List className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>Table of Contents</span>
            </div>
            <nav className="space-y-1">
                {toc.map((item) => (
                    <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`block py-2 text-sm transition-all duration-200 border-l-2 pl-4 ${activeId === item.id
                                ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-900'
                                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-200 dark:hover:border-gray-700'
                            } ${item.level === 3 ? 'ml-4' : ''}`}
                    >
                        {item.text}
                    </a>
                ))}
            </nav>
        </div>
    );
}
