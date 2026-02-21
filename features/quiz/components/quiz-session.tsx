"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { QuizData, QuizResult } from "@/features/quiz";
import { cn } from "@/lib/utils";

type QuizSessionState = {
  quizzes: QuizData[];
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
  const value = useContext(QuizSessionContext);
  if (!value) throw new Error("useQuizSession must be used within a QuizSessionContext.Provider");
  return value as QuizSessionState;
};

export const QuizSessionProvider = ({ quizzes, children }: { quizzes: QuizData[]; children: React.ReactNode }) => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [startedAt] = useState(() => Date.now());
  const [finishedAt, setFinishedAt] = useState<number | null>(null);

  const isFinished = currentQuizIndex >= quizzes.length;

  const addResult = (result: QuizResult) => {
    setResults((prev) => [...prev, result]);
  };

  useEffect(() => {
    if (currentQuizIndex >= quizzes.length && finishedAt === null) {
      setFinishedAt(Date.now());
    }
  }, [currentQuizIndex, quizzes.length, finishedAt]);

  return (
    <QuizSessionContext.Provider
      value={{
        quizzes,
        currentQuizIndex,
        setCurrentQuizIndex,
        results,
        addResult,
        startedAt,
        finishedAt,
        isFinished,
      }}
    >
      {children}
    </QuizSessionContext.Provider>
  );
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
