"use client";

import { createContext, useContext } from "react";
import type { QuizData } from "@/lib/quiz/data";
import type { QuizResult } from "@/lib/quiz-form";

export const QuizPlayContext = createContext<{
  value: string[];
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
  quiz: QuizData;
  result: QuizResult | null;
} | null>(null);

export const useQuizPlay = () => {
  const value = useContext(QuizPlayContext);
  if (!value) throw new Error("useQuizPlay must be used within a QuizPlayContext.Provider");
  return value;
};
