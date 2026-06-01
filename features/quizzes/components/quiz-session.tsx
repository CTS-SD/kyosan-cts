"use client";

import { createContext, use, useCallback, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import type { Quiz, QuizResult } from "../types";

type QuizSessionState = {
  quizzes: Quiz[];
  currentQuizIndex: number;
  setCurrentQuizIndex: React.Dispatch<React.SetStateAction<number>>;

  results: QuizResult[];
  addResult: (result: QuizResult) => void;

  startedAt: number;
  finishedAt: number | null;

  isFinished: boolean;
};

const QuizSessionContext = createContext<QuizSessionState | null>(null);

export const useQuizSession = () => {
  const value = use(QuizSessionContext);
  if (!value) throw new Error("useQuizSession must be used within a QuizSessionContext.Provider");
  return value as QuizSessionState;
};

export const QuizSessionProvider = ({ quizzes, children }: { quizzes: Quiz[]; children: React.ReactNode }) => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [startedAt] = useState(() => Date.now());
  const [finishedAt, setFinishedAt] = useState<number | null>(null);

  const isFinished = currentQuizIndex >= quizzes.length;

  // Capture the finish time once, during render, the moment the session ends.
  // (Adjusting state during render is React's recommended alternative to an effect here.)
  if (isFinished && finishedAt === null) {
    setFinishedAt(Date.now());
  }

  const addResult = useCallback((result: QuizResult) => {
    setResults((prev) => [...prev, result]);
  }, []);

  const value = useMemo<QuizSessionState>(
    () => ({
      quizzes,
      currentQuizIndex,
      setCurrentQuizIndex,
      results,
      addResult,
      startedAt,
      finishedAt,
      isFinished,
    }),
    [quizzes, currentQuizIndex, results, addResult, startedAt, finishedAt, isFinished],
  );

  return <QuizSessionContext.Provider value={value}>{children}</QuizSessionContext.Provider>;
};

export const QuizSessionMainBoundary = ({ children }: { children: React.ReactNode }) => {
  const { isFinished } = useQuizSession();
  if (isFinished) return null;

  return <>{children}</>;
};

export const QuizSessionMain = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn("mx-auto flex h-full max-w-xl grow flex-col overflow-auto bg-background", className)}
      {...props}
    />
  );
};

export const QuizSessionHeader = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn("sticky top-0 z-10 flex h-12 shrink-0 items-center gap-2 bg-background px-4", className)}
      {...props}
    />
  );
};

export const QuizSessionResultBoundary = ({ children }: { children: React.ReactNode }) => {
  const { isFinished } = useQuizSession();
  if (!isFinished) return null;

  return <>{children}</>;
};
