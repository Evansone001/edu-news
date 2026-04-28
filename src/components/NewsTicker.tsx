"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Volume2, VolumeX } from "lucide-react";

interface NewsTickerProps {
  posts: Array<{
    title: string;
    slug: string;
  }>;
}

export function NewsTicker({ posts }: NewsTickerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Get latest 3 posts or fill with placeholders
  const latestPosts = posts.slice(0, 3);
  const displayPosts = latestPosts.length > 0
    ? latestPosts
    : [
        { title: "Digital learning tools transforming Kenyan classrooms", slug: "#" },
        { title: "New scholarship opportunities for STEM students announced", slug: "#" },
        { title: "Ministry of Education launches teacher training program", slug: "#" }
      ];

  useEffect(() => {
    if (isPaused || displayPosts.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayPosts.length);
    }, 4000); // 4 seconds per title

    return () => clearInterval(interval);
  }, [isPaused, displayPosts.length]);

  const currentPost = displayPosts[currentIndex];

  return (
    <div 
      className="bg-slate-800 py-3 sm:py-4 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] animate-pulse" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Breaking News Badge */}
          <div className="flex-shrink-0 flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5">
            <span className="text-white font-bold text-xs sm:text-sm uppercase tracking-wider">
              Latest
            </span>
          </div>

          {/* Rotating News Titles */}
          <div className="flex-1 min-w-0 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex items-center"
              >
                <Link
                  href={currentPost.slug && currentPost.slug !== '#' ? `/blog/${currentPost.slug}` : '/'}
                  className="text-white text-sm sm:text-base font-medium truncate hover:underline underline-offset-2 transition-all flex items-center gap-2 group"
                >
                  <span className="truncate">{currentPost.title}</span>
                  <ChevronRight className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls & Progress */}
          <div className="flex-shrink-0 flex items-center gap-2 sm:gap-3">
            {/* Progress dots */}
            <div className="hidden sm:flex items-center gap-1">
              {displayPosts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? "bg-white w-4" 
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to news item ${index + 1}`}
                />
              ))}
            </div>

            {/* Counter badge */}
            <span className="text-white/70 text-xs font-medium hidden md:inline">
              {currentIndex + 1}/{displayPosts.length}
            </span>

            {/* Mute toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-white/70 hover:text-white transition-colors p-1"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Read All Link */}
            <Link
              href="/blog"
              className="hidden sm:flex items-center gap-1 text-white/90 hover:text-white text-xs sm:text-sm font-medium transition-colors whitespace-nowrap"
            >
              View All
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Progress bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
        <motion.div
          className="h-full bg-white/50"
          initial={{ width: "0%" }}
          animate={{ width: isPaused ? "100%" : "100%" }}
          transition={isPaused ? {} : { duration: 4, ease: "linear" }}
          key={currentIndex + (isPaused ? "paused" : "playing")}
        />
      </div>
    </div>
  );
}
