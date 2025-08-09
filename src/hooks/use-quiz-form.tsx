import { quizFormSchema, QuizFormValues } from "@/lib/quiz-editor";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type Args = {
  defaultValues?: QuizFormValues;
};

export const useQuizForm = (
  { defaultValues }: Args = {
    defaultValues: {
      type: "select",
      question: "",
      explanation: "",
      isPublished: true,
      correctChoicesText: "",
      incorrectChoicesText: "",
    },
  }
) => {
  const form = useForm<QuizFormValues>({
    resolver: zodResolver(quizFormSchema),
    defaultValues,
  });

  return form;
};
