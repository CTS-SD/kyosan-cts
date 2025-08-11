"use client";

import { QuizView } from "@/components/admin/quiz/quiz-view";
import { useQuizForm } from "@/hooks/use-quiz-form";
import { FullQuiz, updateQuiz } from "@/lib/quiz-actions";
import { makeQuizFromFormValues, QuizFormValues } from "@/lib/quiz-editor";
import { toast } from "sonner";

type Props = {
  quiz: FullQuiz;
};

function makeDefaultValues(quiz: FullQuiz): QuizFormValues | undefined {
  if (!quiz) return;

  const commonValues = {
    question: quiz.question,
    explanation: quiz.explanation ?? undefined,
    isPublished: quiz.isPublished,
  };

  if (quiz.type === "select") {
    return {
      type: quiz.type,
      ...commonValues,
      correctChoicesText: quiz.correctChoicesText ?? "",
      incorrectChoicesText: quiz.incorrectChoicesText ?? "",
    };
  }
  if (quiz.type === "text") {
    return {
      type: quiz.type,
      ...commonValues,
      answer: quiz.answer ?? "",
    };
  }
  if (quiz.type === "true_false") {
    return {
      type: quiz.type,
      ...commonValues,
      answer: quiz.answer ?? false,
    };
  }
}

export const ClientView = ({ quiz }: Props) => {
  const form = useQuizForm({
    defaultValues: makeDefaultValues(quiz),
  });

  if (!quiz) return;

  const formValues = form.watch();
  const pseudoQuiz = makeQuizFromFormValues(formValues);

  const handleSubmit = async (values: QuizFormValues) => {
    await updateQuiz(quiz.id, values);
    toast.success("問題を保存しました");
  };

  return (
    <QuizView
      heading={
        <div className="flex gap-1">
          問題{" "}
          <span className="font-semibold text-foreground/40">#{quiz.id}</span>
        </div>
      }
      form={form}
      previewQuiz={pseudoQuiz}
      onSubmit={handleSubmit}
      labels={{ submit: "保存" }}
    />
  );
};
