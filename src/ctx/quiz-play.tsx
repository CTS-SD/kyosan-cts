"use client";

import { QuizResult } from "@/lib/quiz-form";
import { QuizData } from "@/lib/quiz/data";
import { createContext, useContext } from "react";

export const QuizPlayContext = createContext<{
  value: string[];
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
  quiz: QuizData;
  result: QuizResult | null;
} | null>(null);

export const useQuizPlay = () => {
  const value = useContext(QuizPlayContext);
  if (!value)
    throw new Error(
      "useQuizPlay must be used within a QuizPlayContext.Provider",
    );
  return value;
};
