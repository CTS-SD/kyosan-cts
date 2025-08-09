"use client";

import QuizForm from "@/components/admin/quiz-form";
import QuizPreview from "@/components/admin/quiz-preview";
import { Button } from "@/components/ui/button";
import { useQuizForm } from "@/hooks/use-quiz-form";
import { QuizFormValues } from "@/lib/quiz-form";
import { FullQuiz, updateQuiz } from "@/lib/server/quiz";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  quiz: FullQuiz;
};

const ClientPage = ({ quiz }: Props) => {
  const form = useQuizForm({
    defaultValues: {
      ...quiz.quiz,
      ...quiz.select_quiz,
      ...quiz.text_quiz,
      ...quiz.true_false_quiz,
    } as QuizFormValues,
  });

  const handleSubmit = async (values: QuizFormValues) => {
    await updateQuiz(quiz.quiz.id, values);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 flex gap-4">
      <div className="flex-1">
        <Button asChild variant="secondary">
          <Link href="/admin/puratto">
            <ArrowLeftIcon />
            キャンセル
          </Link>
        </Button>
        <QuizForm form={form} onSubmit={handleSubmit} className="mt-6" />
      </div>
      <div className="flex-1">
        <QuizPreview />
      </div>
    </div>
  );
};

export default ClientPage;
