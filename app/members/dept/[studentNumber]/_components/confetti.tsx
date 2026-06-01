"use client";

import confetti from "canvas-confetti";
import { useEffect } from "react";

export const Confetti = ({ delay }: { delay: number }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      confetti();
      confetti({
        angle: 60,
        origin: { x: 0 },
      });
      confetti({
        angle: 120,
        origin: { x: 1 },
      });
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return null;
};
