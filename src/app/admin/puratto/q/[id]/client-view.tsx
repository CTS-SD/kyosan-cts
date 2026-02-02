"use client";

import { toast } from "sonner";
import { QuizView } from "@/components/admin/quiz/quiz-view";
import { useQuizForm } from "@/hooks/use-quiz-form";
import { updateQuiz } from "@/lib/quiz/actions";
import type { QuizData } from "@/lib/quiz/data";
import { makeDefaultValues, type QuizValues } from "@/lib/quiz/editor";

type Props = {
  quiz: QuizData;
};

export const ClientView = ({ quiz }: Props) => {
  const form = useQuizForm({
    defaultValues: makeDefaultValues(quiz),
  });

  const handleSubmit = async (values: QuizValues) => {
    await updateQuiz(quiz.id, values);
    toast.success("問題を保存しました");
    form.reset(values);
  };

  return (
    <QuizView
      heading={
        <div className="flex gap-1">
          問題 <span className="font-semibold text-foreground/40">#{quiz.id}</span>
        </div>
      }
      form={form}
      onSubmit={handleSubmit}
    />
  );
};
