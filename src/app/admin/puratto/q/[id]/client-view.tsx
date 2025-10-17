"use client";

import { QuizView } from "@/components/admin/quiz/quiz-view";
import { useQuizForm } from "@/hooks/use-quiz-form";
import { updateQuiz } from "@/lib/quiz/actions";
import { QuizData } from "@/lib/quiz/data";
import { makePseudoQuiz, QuizValues } from "@/lib/quiz/editor";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

type Props = {
  quiz: QuizData;
};

function makeDefaultValues(quiz: QuizData): QuizValues {
  const commonValues = {
    id: quiz.id,
    question: quiz.question,
    explanation: quiz.explanation ?? undefined,
    isPublished: quiz.isPublished,
  };
  const quizType = quiz.type;

  switch (quiz.type) {
    case "select":
      return {
        type: quiz.type,
        ...commonValues,
        correctChoicesText: quiz.correctChoices.join("\n"),
        incorrectChoicesText: quiz.incorrectChoices.join("\n"),
      };
    case "text":
      return {
        type: quiz.type,
        ...commonValues,
        answer: quiz.answer,
      };
    case "true_false":
      return {
        type: quiz.type,
        ...commonValues,
        answer: quiz.answer,
      };
    default: {
      throw new Error(`Unknown quiz type: ${quizType}`);
    }
  }
}

export const ClientView = ({ quiz }: Props) => {
  const router = useRouter();
  const form = useQuizForm({
    defaultValues: makeDefaultValues(quiz),
  });

  useEffect(() => {
    form.reset(makeDefaultValues(quiz));
  }, [quiz]);

  if (!quiz) return;

  const formValues = form.watch();
  const pseudoQuiz = makePseudoQuiz(formValues);

  const handleSubmit = async (values: QuizValues) => {
    await updateQuiz(quiz.id, values);
    toast.success("問題を保存しました");
    router.refresh();
  };

  return (
    <QuizView
      heading={
        <div className="flex gap-1">
          問題{" "}
          <span className="text-foreground/40 font-semibold">#{quiz.id}</span>
        </div>
      }
      form={form}
      previewQuiz={pseudoQuiz}
      onSubmit={handleSubmit}
    />
  );
};
