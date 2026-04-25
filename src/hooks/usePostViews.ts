'use client';

import { useState, useEffect, useRef } from 'react';

interface ViewCountData {
  views: number;
  lastViewed?: string;
}

// Track viewed posts in this session to prevent duplicate counting
const getViewedPosts = (): Set<string> => {
  if (typeof window === 'undefined') return new Set();
  try {
    const viewed = sessionStorage.getItem('sheria_viewed_posts');
    return new Set(viewed ? JSON.parse(viewed) : []);
  } catch {
    return new Set();
  }
};

const markPostAsViewed = (slug: string) => {
  if (typeof window === 'undefined') return;
  try {
    const viewed = getViewedPosts();
    viewed.add(slug);
    sessionStorage.setItem('sheria_viewed_posts', JSON.stringify([...viewed]));
  } catch {
    // Ignore storage errors
  }
};

const hasViewedPost = (slug: string): boolean => {
  return getViewedPosts().has(slug);
};

export function usePostViews(slug: string) {
  const [viewCount, setViewCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const hasIncremented = useRef(false);

  useEffect(() => {
    if (!slug) return;

    // Check if already viewed in this session
    const alreadyViewed = hasViewedPost(slug);

    const fetchViews = async () => {
      try {
        // Always fetch current view count
        const response = await fetch(`/api/views?slug=${encodeURIComponent(slug)}`);
        if (!response.ok) throw new Error('Failed to fetch views');
        
        const data = await response.json();
        if (data.success) {
          setViewCount(data.views);
        }
      } catch (err) {
        console.error('Error fetching views:', err);
      }
    };

    const incrementViews = async () => {
      // Prevent double incrementing
      if (hasIncremented.current) return;
      hasIncremented.current = true;

      // Skip if already viewed in this session
      if (alreadyViewed) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/views', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug }),
        });

        if (!response.ok) throw new Error('Failed to increment views');

        const data = await response.json();
        if (data.success) {
          setViewCount(data.views);
          // Mark as viewed for this session
          markPostAsViewed(slug);
        }
      } catch (err) {
        console.error('Error incrementing views:', err);
        setError('Failed to track views');
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch current count first, then increment if new view
    fetchViews().then(() => {
      incrementViews();
    });
  }, [slug]);

  // Format view count with realistic thresholds
  const formatViewCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M views`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K views`;
    } else {
      return `${count} ${count === 1 ? 'view' : 'views'}`;
    }
  };

  return {
    viewCount,
    isLoading,
    error,
    formattedViewCount: formatViewCount(viewCount),
    isUniqueView: !hasViewedPost(slug), // Expose if this is a new unique view
  };
}
