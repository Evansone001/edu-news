'use client';

import { usePostViews } from '@/hooks/usePostViews';
import { Eye } from 'lucide-react';

interface ViewCounterProps {
  slug: string;
  className?: string;
  showLabel?: boolean;
  initialViews?: number;
}

export default function ViewCounter({ 
  slug, 
  className = '', 
  showLabel = true,
  initialViews = 0
}: ViewCounterProps) {
  const { viewCount, isLoading, formattedViewCount, isUniqueView } = usePostViews(slug);

  // Use realistic display count (never show 0, add initial seed if needed)
  const displayCount = Math.max(viewCount || initialViews, initialViews);

  if (isLoading) {
    return (
      <div className={`flex items-center gap-1.5 text-gray-400 ${className}`}>
        <Eye className="w-3.5 h-3.5" />
        <span className="text-xs">...</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1.5 ${className}`} title={isUniqueView ? "You haven't viewed this yet" : "You've viewed this post"}>
      <Eye className="w-3.5 h-3.5 text-gray-400" />
      <span className="text-xs text-gray-500">
        {showLabel ? formattedViewCount : displayCount}
      </span>
    </div>
  );
}
