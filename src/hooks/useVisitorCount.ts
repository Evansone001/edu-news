"use client";

import { useState, useEffect } from "react";

interface UseVisitorCountOptions {
  min?: number;
  max?: number;
  interval?: number;
  initial?: number;
}

export function useVisitorCount(options: UseVisitorCountOptions = {}): number {
  const { min = 300, max = 420, interval = 3000, initial = 347 } = options;
  const [count, setCount] = useState(initial);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        return Math.max(min, Math.min(max, prev + delta));
      });
    }, interval);

    return () => clearInterval(timer);
  }, [min, max, interval]);

  return count;
}
