"use client";

import { useReaderPresence } from "@/hooks/useReaderPresence";
// import { useVisitorCount } from "@/hooks/useVisitorCount";

export function LiveVisitors() {
  // Use real-time presence with Redis
  const count = useReaderPresence();
  // const count = useVisitorCount({ initial: 347, min: 300, max: 420 });
  // Don't render anything until we have a real count.
  // Showing 0 or a placeholder while the join request is in-flight would be
  // misleading (the join response itself returns the current count).
  if (count === null) return null;

  // ── State: empty room ─────────────────────────────────────────────────────
  if (count === 0) {
    return (
      <div className="flex justify-end pt-3 pb-1">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-600 inline-block" />
          <span>Be the first reader</span>
        </div>
      </div>
    );
  }

  // ── State: live readers ────────────────────────────────────────────────────
  return (
    <div className="flex justify-end pt-3 pb-1">
      <div className="flex items-center gap-2 text-xs text-slate-400">
        {/* Pulse indicator - using Tailwind's animate-ping for better performance */}
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
    </div>
  );
}
