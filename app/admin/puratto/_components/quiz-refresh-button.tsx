"use client";

import { RefreshCwIcon } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useQuizList } from "@/app/admin/puratto/_components/use-quiz-list";
import { Button } from "@/components/ui/button";

export const QuizRefreshButton = () => {
  const { refetch } = useQuizList();
  const [key, setKey] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    refetch();
    setIsAnimating(true);
    setKey((p) => (p + 1) % 2);
  };

  return (
    <Button variant="outline" className="shrink-0" size="icon" onClick={handleClick} disabled={isAnimating}>
      <motion.div
        key={key}
        initial={{ rotate: 0 }}
        animate={{ rotate: key >= 0 ? 360 : 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        onAnimationComplete={() => setIsAnimating(false)}
      >
        <RefreshCwIcon />
      </motion.div>
    </Button>
  );
};
