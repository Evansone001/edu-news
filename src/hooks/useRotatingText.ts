"use client";

import { useState, useEffect } from "react";

interface UseRotatingTextOptions {
  interval?: number;
  exitDuration?: number;
}

interface UseRotatingTextReturn {
  textIndex: number;
  isExiting: boolean;
}

export function useRotatingText(
  texts: string[],
  options: UseRotatingTextOptions = {}
): UseRotatingTextReturn {
  const { interval = 3500, exitDuration = 300 } = options;
  const [textIndex, setTextIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (texts.length <= 1) return;

    const timer = setInterval(() => {
      setIsExiting(true);
      setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % texts.length);
        setIsExiting(false);
      }, exitDuration);
    }, interval);

    return () => clearInterval(timer);
  }, [texts.length, interval, exitDuration]);

  return { textIndex, isExiting };
}
