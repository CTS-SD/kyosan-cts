"use client";

import { AnimatePresence, motion } from "motion/react";
import { QuizPlay } from "@/components/quiz-play/quiz-play";
import { useQuizSession } from "@/components/quiz-play/quiz-session";
import type { QuizResult } from "@/lib/quiz";

export const QuizPlayView = () => {
  const { quizzes, addResult, currentQuizIndex, setCurrentQuizIndex } = useQuizSession();

  return (
    <AnimatePresence mode="popLayout">
      {quizzes.map((quiz) => {
        const handleAnswer = (result: QuizResult) => {
          addResult(result);
        };
        const handleNext = () => {
          setCurrentQuizIndex((prev) => prev + 1);
        };

        if (quiz.id !== quizzes[currentQuizIndex]?.id) {
          return null;
        }

        return (
          <motion.div
            key={quiz.id}
            initial={{ translateX: "100%" }}
            animate={{ translateX: "0%" }}
            exit={{ translateX: "-100%" }}
            transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 0.34 }}
            className="flex grow flex-col overflow-auto"
            layout
          >
            <QuizPlay.Provider key={quiz.id} quiz={quiz} onAnswer={handleAnswer} onNext={handleNext}>
              <QuizPlay.Content />
            </QuizPlay.Provider>
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
};
