"use client";

import { toast } from "sonner";
import { QuizView } from "../../../../../components/admin/quiz/quiz-view";
import { useQuizForm } from "../../../../../hooks/use-quiz-form";
import { type QuizData, type QuizEditorValues, toEditorValues, updateQuiz } from "../../../../../lib/quiz";

type Props = {
  quiz: QuizData;
};

export const ClientView = ({ quiz }: Props) => {
  const form = useQuizForm({
    defaultValues: toEditorValues(quiz),
  });

  const handleSubmit = async (values: QuizEditorValues) => {
    await updateQuiz(quiz.id, values);
    toast.success("問題を保存しました");
    form.reset(values);
  };

  return (
    <QuizView
      heading={
        <div className="flex gap-1">
          問題 <span className="font-semibold text-foreground/40">No.{quiz.id}</span>
        </div>
      }
      form={form}
      onSubmit={handleSubmit}
    />
  );
};
