'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { Post } from '@/types';

function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const [results, setResults] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            if (!query) {
                setResults([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await fetch('/api/articles');
                const data = await response.json();

                if (data.success && data.data.results) {
                    const filtered = data.data.results.filter((post: Post) =>
                        post.title.toLowerCase().includes(query.toLowerCase()) ||
                        post.description.toLowerCase().includes(query.toLowerCase())
                    );
                    setResults(filtered);
                }
            } catch (error) {
                console.error('Error searching:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [query]);

    return (
        <div className="min-h-screen bg-white pt-20 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Search Results for "{query}"
                </h1>
                <p className="text-gray-600 mb-12">
                    {loading ? 'Searching...' : `Found ${results.length} articles matching your search.`}
                </p>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="animate-pulse bg-gray-100 rounded-xl h-64"></div>
                        ))}
                    </div>
                ) : results.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {results.map(post => (
                            <Link key={post.id} href={`/blog/${typeof post.slug === 'string' ? post.slug : post.slug.current}`} className="group">
                                <article className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                                    <div className="aspect-video bg-gray-100 relative overflow-hidden">
                                        <img
                                            src={post.mainImage.url}
                                            alt={post.title}
                                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                            {post.description}
                                        </p>
                                        <div className="text-blue-600 font-semibold text-sm">Read Article →</div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-2xl">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">No results found</h2>
                        <p className="text-gray-600 mb-8">Try searching for different keywords or check out our latest articles.</p>
                        <Link href="/" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
                            Go Back Home
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div>Loading search...</div>}>
            <SearchResults />
        </Suspense>
    );
}
