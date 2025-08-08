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

function makeDefaultValues(quiz: FullQuiz): QuizFormValues | undefined {
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

const ClientPage = ({ quiz }: Props) => {
  const form = useQuizForm({
    defaultValues: makeDefaultValues(quiz),
  });

  const handleSubmit = async (values: QuizFormValues) => {
    await updateQuiz(quiz.id, values);
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
