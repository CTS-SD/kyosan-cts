"use client";

import QuizForm from "@/components/admin/quiz-form";
import QuizPreview from "@/components/admin/quiz-preview";
import { Button } from "@/components/ui/button";
import { useQuizForm } from "@/hooks/use-quiz-form";
import { FullQuiz, updateQuiz } from "@/lib/quiz-actions";
import { makeQuizFromFormValues, QuizFormValues } from "@/lib/quiz-editor";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

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

const ClientPage = ({ quiz }: Props) => {
  if (!quiz) return;

  const form = useQuizForm({
    defaultValues: makeDefaultValues(quiz),
  });

  const formValues = form.watch();
  const pseudoQuiz = makeQuizFromFormValues(formValues);

  const handleSubmit = async (values: QuizFormValues) => {
    await updateQuiz(quiz.id, values);
  };

  return (
    <div className="max-w-5xl mx-auto flex h-[calc(100dvh-48px)]">
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Button asChild variant="secondary">
            <Link href="/admin/puratto">
              <ArrowLeftIcon />
              戻る
            </Link>
          </Button>
          <QuizForm form={form} onSubmit={handleSubmit} className="mt-6" />
        </div>
      </div>
      <div className="flex-1">
        <QuizPreview quiz={pseudoQuiz} />
      </div>
    </div>
  );
};

export default ClientPage;
