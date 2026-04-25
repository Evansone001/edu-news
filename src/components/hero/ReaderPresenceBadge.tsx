/**
 * Drop-in replacement for the fake visitor counter in NewSheriaHero.
 *
 * Usage in the hero:
 *   import { ReaderPresenceBadge } from "@/components/ReaderPresenceBadge";
 *   <ReaderPresenceBadge />
 *
 * Rendering states:
 *   count === null  → loading state, badge hidden (no flash of wrong number)
 *   count === 0     → "Be the first reader" (empty room state)
 *   count >= 1      → "{N} readers online now"
 */

"use client";

import { useReaderPresence } from "@/hooks/useReaderPresence";

export function ReaderPresenceBadge() {
  const count = useReaderPresence();

  // ── State: loading (null) ─────────────────────────────────────────────────
  // Don't render anything until we have a real count.
  // Showing 0 or a placeholder while the join request is in-flight would be
  // misleading (the join response itself returns the current count).
  if (count === null) return null;

  // ── State: empty room ─────────────────────────────────────────────────────
  if (count === 0) {
    return (
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-600 inline-block" />
        <span>Be the first reader</span>
      </div>
    );
  }

  // ── State: live readers ────────────────────────────────────────────────────
  return (
    <div className="flex items-center gap-2 text-xs text-slate-400">
      {/* Pulse indicator */}
      <span className="relative inline-flex w-2 h-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
        <span className="relative inline-flex rounded-full w-2 h-2 bg-green-400" />
      </span>
      <span>
        <span className="text-slate-200 font-semibold tabular-nums">
          {count.toLocaleString()}
        </span>{" "}
        {count === 1 ? "reader" : "readers"} online now
      </span>
    </div>
  );
}
