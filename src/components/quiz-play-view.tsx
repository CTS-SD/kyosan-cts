"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FullQuiz } from "@/lib/quiz-actions";
import { QuizResult } from "@/lib/quiz-form";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { useState } from "react";
import { QuizFormText } from "./quiz-form-text";
import { QuizFormTrueFalse } from "./quiz-form-true-false";

const QuizFormSelect = dynamic(() => import("@/components/quiz-form-select"), {
  ssr: false,
});

type Props = React.ComponentProps<"div"> & {
  quiz: FullQuiz;
  progress: number;
  headerContent?: React.ReactNode;
  addResult?: (result: QuizResult) => void;
  onNext?: () => void;
};

export const QuizPlayView = ({
  quiz,
  progress,
  addResult,
  onNext,
  headerContent,
  className,
  ...props
}: Props) => {
  if (!quiz) notFound();

  const [result, setResult] = useState<QuizResult | null>(null);
  const [userAnswer, setUserAnswer] = useState<string[]>([]);

  const showAnswer = !!result;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (showAnswer) {
      handleNext();
      return;
    }

    let isCorrect = false;
    if (quiz.type === "select") {
      const correctAnswers = quiz.correctChoicesText?.split("\n");
      isCorrect =
        userAnswer.length === correctAnswers?.length &&
        userAnswer.every((ans) => correctAnswers?.includes(ans));
    } else if (quiz.type === "text") {
      isCorrect = !!quiz.answer?.split("\n").includes(userAnswer[0]?.trim());
    } else if (quiz.type === "true_false") {
      isCorrect = Boolean(userAnswer[0] === "true") === quiz.answer;
    }

    const resultItem = {
      quizId: quiz.id,
      userAnswer,
      isCorrect,
    };

    setResult(resultItem);
    addResult?.(resultItem);
  };

  const handleNext = () => {
    setResult(null);
    setUserAnswer([]);
    onNext?.();
  };

  return (
    <div
      className={cn("mx-auto flex h-full max-w-xl grow flex-col", className)}
      {...props}
    >
      <header className="flex h-12 items-center gap-2 ps-2 pe-6">
        {headerContent}
        <div className="grow">
          <Progress value={progress} className="w-full" />
        </div>
      </header>
      <form onSubmit={handleSubmit} className="flex grow flex-col">
        <div className="grow">
          <div className="px-6 pt-4 pb-8 whitespace-pre-wrap">
            {quiz.question}
          </div>
          <div>
            {quiz.type === "select" && (
              <QuizFormSelect
                value={userAnswer}
                setValue={setUserAnswer}
                quiz={quiz}
                showAnswer={showAnswer}
              />
            )}
            {quiz.type === "text" && (
              <QuizFormText
                value={userAnswer[0] ?? ""}
                setValue={setUserAnswer}
                quiz={quiz}
                showAnswer={showAnswer}
              />
            )}
            {quiz.type === "true_false" && (
              <QuizFormTrueFalse
                value={userAnswer[0] ?? ""}
                setValue={setUserAnswer}
                quiz={quiz}
                showAnswer={showAnswer}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 p-4">
          {result && (
            <div className="flex flex-col gap-1.5 px-2">
              <div
                className={cn(
                  "text-lg font-bold",
                  result.isCorrect ? "text-green-500" : "text-red-500",
                )}
              >
                {result.isCorrect ? "正解" : "不正解"}
              </div>
              {quiz.explanation && <p>{quiz.explanation}</p>}
            </div>
          )}
          <Button
            type="submit"
            className={cn(
              "w-full",
              result
                ? result.isCorrect
                  ? "bg-green-500!"
                  : "bg-red-500!"
                : null,
            )}
            size="lg"
          >
            {result ? "OK" : "送信"}
          </Button>
        </div>
      </form>
    </div>
  );
};
