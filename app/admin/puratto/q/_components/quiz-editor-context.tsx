"use client";

import { createContext, use } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { QuizEditorValues } from "@/features/quizzes";

export type QuizEditorState = {
  form: UseFormReturn<QuizEditorValues>;
  state: UseFormReturn<QuizEditorValues>["formState"];
  onSubmit: (values: QuizEditorValues) => void;
};

export const QuizEditorContext = createContext<QuizEditorState | null>(null);

export const useQuizEditor = (): QuizEditorState => {
  const value = use(QuizEditorContext);
  if (!value) throw new Error("useQuizEditor must be used within a QuizEditorContext.Provider");
  return value;
};
