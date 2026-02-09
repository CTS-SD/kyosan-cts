"use client";

import { createContext, useContext } from "react";
import type { QuizData, QuizResult } from "../lib/quiz";

interface QuizPlayContextType<T extends QuizData> {
  inputValue: string[];
  setInputValue: React.Dispatch<React.SetStateAction<string[]>>;
  isValidInput: boolean;
  quiz: T;
  result: QuizResult | null;
  setResult: React.Dispatch<React.SetStateAction<QuizResult | null>>;

  onAnswer?: (result: QuizResult) => void;
  onNext?: () => void;
}

export const QuizPlayContext = createContext<QuizPlayContextType<QuizData> | null>(null);

export const useQuizPlay = <T extends QuizData>() => {
  const value = useContext(QuizPlayContext);
  if (!value) throw new Error("useQuizPlay must be used within a QuizPlayContext.Provider");
  return value as QuizPlayContextType<T>;
};
