"use client";

import { createContext, useContext } from "react";
import type { QuizData } from "@/lib/quiz/data";
import type { QuizResult } from "@/lib/quiz-form";

interface QuizPlayContextType<T extends QuizData> {
  inputValue: string[];
  setInputValue: React.Dispatch<React.SetStateAction<string[]>>;
  quiz: T;
  result: QuizResult | null;
}

export const QuizPlayContext = createContext<QuizPlayContextType<QuizData> | null>(null);

export const useQuizPlay = <T extends QuizData>() => {
  const value = useContext(QuizPlayContext);
  if (!value) throw new Error("useQuizPlay must be used within a QuizPlayContext.Provider");
  return value as QuizPlayContextType<T>;
};
