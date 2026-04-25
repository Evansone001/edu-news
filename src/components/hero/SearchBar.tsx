"use client";

import { useState, useRef, useCallback } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { SEARCH_SUGGESTIONS } from "./constants";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside(wrapperRef, () => setShowSuggestions(false));

  const filteredSuggestions = useCallback(() => {
    if (!query.trim()) return SEARCH_SUGGESTIONS;
    const q = query.toLowerCase();
    return SEARCH_SUGGESTIONS.filter((s) => s.toLowerCase().includes(q));
  }, [query]);

  return (
    <div ref={wrapperRef} className="search-wrapper relative max-w-xl">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${
          showSuggestions
            ? "bg-slate-800 border-amber-500/50"
            : "bg-slate-800/70 border-slate-700 hover:border-slate-600"
        }`}
      >
        <svg
          className="w-4 h-4 text-slate-400 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search cases, acts, legal topics…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none"
          aria-label="Search legal content"
          aria-autocomplete="list"
          aria-expanded={showSuggestions}
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="text-slate-500 hover:text-slate-300 transition-colors text-xs px-1"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-slate-800 border border-slate-700 rounded-xl overflow-hidden z-20 shadow-xl shadow-black/40">
          {filteredSuggestions().length > 0 ? (
            filteredSuggestions().map((s) => (
              <div
                key={s}
                className="suggest-item flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300"
                onClick={() => {
                  setQuery(s);
                  setShowSuggestions(false);
                }}
              >
                <svg
                  className="w-3.5 h-3.5 text-slate-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
                  />
                </svg>
                {s}
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-slate-500">
              No suggestions found
            </div>
          )}
          <div className="border-t border-slate-700/60 px-4 py-2">
            <span className="text-xs text-slate-500">
              Press Enter to search all results
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
