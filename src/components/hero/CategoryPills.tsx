"use client";

import { useState } from "react";
import { CATEGORIES } from "./constants";

export function CategoryPills() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = (cat: string) => {
    setActiveCategory((prev) => (prev === cat ? null : cat));
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    // Close active category when collapsing
    if (isExpanded) {
      setActiveCategory(null);
    }
  };

  const visibleCategories = isExpanded ? CATEGORIES : CATEGORIES.slice(0, 4);
  const hasMore = CATEGORIES.length > 4;

  return (
    <div className="pb-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs font-bold text-gray-600 uppercase tracking-wider bg-gradient-to-r from-blue-100 to-blue-200 px-3 py-1 rounded-full border border-blue-300">
          Browse Topics
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-amber-200 to-transparent" />
      </div>
      <div className="flex flex-wrap gap-2.5">
        {visibleCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleClick(cat)}
            className={`group relative px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 transform hover:scale-105 ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-200/50 border-2 border-blue-400'
                : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 shadow-sm hover:shadow-md'
            }`}
            aria-pressed={activeCategory === cat}
          >
            <span className="relative z-10 flex items-center gap-1.5">
              {activeCategory === cat && <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />}
              {cat}
            </span>
            {activeCategory === cat && (
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 opacity-20 animate-pulse" />
            )}
          </button>
        ))}
        
        {hasMore && (
          <button
            onClick={toggleExpand}
            className="group relative px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-300 hover:text-gray-900 shadow-sm hover:shadow-md"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              {isExpanded ? (
                <>
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
                  Show Less
                </>
              ) : (
                <>
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
                  +{CATEGORIES.length - 4} More
                </>
              )}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
