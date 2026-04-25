"use client";

import { useRotatingText } from "@/hooks/useRotatingText";
import { ROTATING_TEXTS } from "./constants";

export function RotatingText() {
  const { textIndex, isExiting } = useRotatingText(ROTATING_TEXTS);

  return (
    <div className="h-6 mb-5 overflow-hidden">
      <p
        className={`text-sm sm:text-base text-slate-400 ${
          isExiting ? "rotate-exit" : "rotate-enter"
        }`}
      >
        Providing{" "}
        <span className="font-semibold text-blue-300">
          {ROTATING_TEXTS[textIndex]}
        </span>{" "}
        for students and educators
      </p>
    </div>
  );
}
