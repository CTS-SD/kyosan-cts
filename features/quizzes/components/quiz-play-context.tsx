"use client";

import { createContext, use } from "react";
import type { Quiz, QuizResult } from "../types";

export interface QuizPlayState<T extends Quiz> {
  inputValue: string[];
  setInputValue: React.Dispatch<React.SetStateAction<string[]>>;
  isValidInput: boolean;
  quiz: T;
  result: QuizResult | null;
  setResult: React.Dispatch<React.SetStateAction<QuizResult | null>>;

  onAnswer?: (result: QuizResult) => void;
  onNext?: () => void;

  enableKeyboard: boolean;
  choicesRef: React.RefObject<string[]>;
}

export const QuizPlayContext = createContext<QuizPlayState<Quiz> | null>(null);

export const useQuizPlay = <T extends Quiz>() => {
  const value = use(QuizPlayContext);
  if (!value) throw new Error("useQuizPlay must be used within a QuizPlayContext.Provider");
  return value as QuizPlayState<T>;
};
