"use client";

import { AnimatePresence, motion } from "motion/react";
import type { QuizResult } from "@/features/quiz";
import { QuizPlay } from "@/features/quiz/components/quiz-play";
import { useQuizSession } from "@/features/quiz/components/quiz-session";

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
            <QuizPlay.Provider key={quiz.id} quiz={quiz} onAnswer={handleAnswer} onNext={handleNext} enableKeyboard>
              <QuizPlay.Content />
            </QuizPlay.Provider>
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
};
