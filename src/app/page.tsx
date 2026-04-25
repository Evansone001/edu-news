'use client';

import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { usePathname } from "next/navigation";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from 'framer-motion';
import ViewCounter from '@/components/ViewCounter';
import { NewsTicker } from '@/components/NewsTicker';
import { Post } from '@/types';


export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    // Fetch posts from Ghost API
    setLoading(true);
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.results) {
          setPosts(data.data.results);
          setFilteredPosts(data.data.results);
        } else {
          setError('Failed to load articles');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching articles:', err);
        setError('Failed to load articles');
        setLoading(false);
      });
  }, []);

  // Get all unique categories
  const allCategories = ['all', ...Array.from(new Set(posts.flatMap(post =>
    post.categories.map(cat => cat.title)
  )))];

  // Filter posts by category
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post =>
        post.categories.some(cat => cat.title === activeFilter)
      );
      setFilteredPosts(filtered);
    }
  }, [activeFilter, posts]);

  // Handle scroll for header effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection observer for lazy loading
  const { ref: gridRef, inView: gridInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  // Calculate read time
  const calculateReadTime = (description: string) => {
    const wordsPerMinute = 200;
    const words = description.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Head>
        <title>EDU NEWS | Education Blog & Learning Resources</title>
        <meta
          name="description"
          content="Education insights, teaching resources, and learning materials by EDU NEWS. Empowering students and educators with quality content."
        />
        <meta name="keywords" content="education, teaching, learning, edunews, educational resources, study materials" />
        <meta property="og:title" content="EDU NEWS - Education Blog" />
        <meta property="og:description" content="Education insights and learning resources" />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#1e293b" />
      </Head>

      {/* Hero Section */}
      <section className="relative z-10">
        <Hero />
      </section>

      {/* Main Content */}
      <main className="relative z-20 bg-white">
        {/* Featured Posts Banner - Rotating News Ticker */}
        <NewsTicker posts={posts.map(p => ({ title: p.title, slug: typeof p.slug === 'string' ? p.slug : p.slug.current }))} />

        {/* Posts Grid */}
        <div
          ref={gridRef}
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-12 lg:py-8"
        >
          {/* Grid Header - Card Style */}
          <div className="mb-6 sm:mb-8">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight">
                      {activeFilter === 'all' ? (
                        <>Latest Educational Content</>
                      ) : (
                        <>{activeFilter}</>
                      )}
                    </h2>
                  </div>
                  <p className="text-gray-500 ml-4 text-sm">
                    {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} available
                  </p>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    Most Recent
                  </button>
                  <button className="px-3 py-1.5 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Posts Grid */}
          <AnimatePresence>
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={gridInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-blue-200 hover:shadow-xl transition-all duration-300"
                >
                  <Link href={`/blog/${typeof post.slug === 'string' ? post.slug : post.slug.current}`} className="block">
                    {/* Image Container */}
                    <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden bg-gray-100">
                      {post.mainImage?.url ? (
                        <img
                          src={post.mainImage.url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <span className="text-gray-500 text-sm">No Image</span>
                        </div>
                      )}
                      {/* Category Badge */}
                      {post.categories[0] && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                            {post.categories[0].title}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6">
                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-2">
                        {post.description.replace(/!\[\]\(.*?\)/g, '').replace(/[#*]/g, '').substring(0, 150)}...
                      </p>

                      {/* Meta Information */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-3">
                          {post.author.image && (
                            <div className="relative w-8 h-8 rounded-full overflow-hidden">
                              <Image
                                src={post.author.image}
                                alt={post.author.name}
                                fill
                                className="object-cover"
                                sizes="32px"
                              />
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {post.author.name}
                            </p>
                            {post.author.title && (
                              <p className="text-xs text-gray-500">{post.author.title}</p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <span className="text-xs text-gray-500">
                              {formatDate(post.publishedAt)}
                            </span>
                            <span className="text-xs text-gray-500 hidden sm:inline">
                              • {post.readTime || calculateReadTime(post.description)} min read
                            </span>
                          </div>
                          <ViewCounter slug={typeof post.slug === 'string' ? post.slug : post.slug.current} className="text-xs" showLabel={false} />
                        </div>
                      </div>

                      {/* Additional Categories */}
                      {post.categories.length > 1 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {post.categories.slice(1, 3).map((cat) => (
                            <span
                              key={cat.slug}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                            >
                              {cat.title}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No articles found</h3>
              <p className="text-gray-500 mb-6">Try selecting a different category</p>
              <button
                onClick={() => setActiveFilter('all')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All Articles
              </button>
            </div>
          )}

          {/* Load More Button */}
          {filteredPosts.length > 0 && filteredPosts.length < posts.length && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setLoading(true)}
                disabled={loading}
                className="px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Loading...
                  </span>
                ) : (
                  'Load More Articles'
                )}
              </button>
            </div>
          )}
        </div>

        {/* Newsletter CTA */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-gray-200 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Stay Updated with Educational Content
            </h2>
            <p className="text-gray-600 mb-4 max-w-2xl mx-auto text-sm">
              Get weekly teaching tips, learning resources, and educational insights delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Subscribe
              </button>
            </form>
            <p className="text-gray-500 text-xs mt-3">
              Join 1000+ students and educators
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

// Helper function for truncating text
function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}