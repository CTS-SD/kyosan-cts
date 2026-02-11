import { createContext, useContext } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { QuizEditorValues } from "@/lib/quiz";

type QuizEditorState = {
  form: UseFormReturn<QuizEditorValues>;
  state: UseFormReturn<QuizEditorValues>["formState"];
  onSubmit: (values: QuizEditorValues) => void;
};

export const QuizEditorContext = createContext<QuizEditorState | null>(null);

export const useQuizEditor = (): QuizEditorState => {
  const value = useContext(QuizEditorContext);
  if (!value) throw new Error("useQuizEditor must be used within a QuizEditorContext.Provider");
  return value;
};
