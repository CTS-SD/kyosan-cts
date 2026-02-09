import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { QuizEditorSchema, type QuizEditorValues } from "../lib/quiz";

type Args = {
  defaultValues: QuizEditorValues;
};

export const useQuizForm = (
  { defaultValues }: Args = {
    defaultValues: {
      id: null,
      type: "select",
      question: "",
      explanation: "",
      isPublished: true,
      correctChoicesText: "",
      incorrectChoicesText: "",
    },
  },
) => {
  const form = useForm<QuizEditorValues>({
    resolver: zodResolver(QuizEditorSchema),
    defaultValues,
  });

  return form;
};
