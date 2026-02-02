import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { QuizEditorSchema, type QuizValues } from "@/lib/quiz/editor";

type Args = {
  defaultValues: QuizValues;
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
  const form = useForm<QuizValues>({
    resolver: zodResolver(QuizEditorSchema),
    defaultValues,
  });

  return form;
};
