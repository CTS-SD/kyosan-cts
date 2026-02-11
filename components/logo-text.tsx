"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const charAnimationProps: React.ComponentProps<typeof motion.span> = {
  initial: { opacity: 0, scale: 0, rotate: -90 },
  animate: { opacity: 1, scale: 1, rotate: 0 },
  exit: { opacity: 0, scale: 0, rotate: 90 },
  transition: { type: "spring", bounce: 0.4 },
};

export const LogoText = () => {
  const [showU, setShowU] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowU((prev) => !prev);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-0.5 font-semibold text-xs">
      <div className="rounded-sm rounded-br-none bg-sky-500 px-1 py-0.5 text-white">
        KS
        <AnimatePresence mode="popLayout" initial={false}>
          {showU ? (
            <motion.span key="u" className="inline-flex w-[1ch]" layout {...charAnimationProps}>
              U
            </motion.span>
          ) : (
            <motion.span key="d" className="inline-flex w-[1ch]" layout {...charAnimationProps}>
              D
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <div className="font-accent">キャンスタ</div>
    </div>
  );
};
