"use client";

import { Progress } from "@/components/ui/progress";
import { QuizResult } from "@/lib/quiz-form";
import { QuizData } from "@/lib/quiz/data";
import { cn } from "@/lib/utils";
import { CircleIcon, XIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Markdown } from "./markdown";
import { QuizAnswerRenderer } from "./quiz-answer-renderer";
import { QuizFormText } from "./quiz-form-text";
import { QuizFormTrueFalse } from "./quiz-form-true-false";
import { PlayfulButton } from "./ui/playful-button";

const QuizFormSelect = dynamic(() => import("@/components/quiz-form-select"), {
  ssr: false,
});

type Props = React.ComponentProps<"div"> & {
  quiz: QuizData;
  progress: number;
  headerStartContent?: React.ReactNode;
  headerEndContent?: React.ReactNode;
  addResult?: (result: QuizResult) => void;
  onNext?: () => void;
};

export const QuizPlayView = ({
  quiz,
  progress,
  addResult,
  onNext,
  headerStartContent,
  headerEndContent,
  className,
  ...props
}: Props) => {
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
      isCorrect =
        userAnswer.length === quiz.correctChoices.length &&
        userAnswer.every((ans) => quiz.correctChoices.includes(ans));
    } else if (quiz.type === "text") {
      isCorrect = !!quiz.answer?.split("\n").includes(userAnswer[0]?.trim());
    } else if (quiz.type === "true_false") {
      isCorrect = (userAnswer[0] === "true") === quiz.answer;
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
      <header className="flex h-12 items-center gap-2 px-4">
        {headerStartContent}
        <div className="grow">
          <Progress value={progress} className="w-full" />
        </div>
        {headerEndContent}
      </header>
      <form onSubmit={handleSubmit} className="flex grow flex-col">
        <div className="grow">
          <div className="px-6 pt-2 pb-6">
            <Markdown>{quiz.question}</Markdown>
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
                setValue={(val) => setUserAnswer([val])}
                quiz={quiz}
                showAnswer={showAnswer}
              />
            )}
            {quiz.type === "true_false" && (
              <QuizFormTrueFalse
                value={
                  userAnswer.length > 0 ? userAnswer[0] === "true" : undefined
                }
                setValue={(val) => setUserAnswer([val ? "true" : "false"])}
                quiz={quiz}
                showAnswer={showAnswer}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t p-4 sticky bottom-0 bg-background">
          {result && (
            <div className="flex flex-col gap-1.5 px-2">
              <div
                className={cn(
                  "flex items-center gap-1 text-xl font-bold [&_svg]:size-5",
                  result.isCorrect ? "text-green-500" : "text-red-500",
                )}
              >
                {result.isCorrect ? (
                  <>
                    <CircleIcon />
                    <span>正解</span>
                  </>
                ) : (
                  <>
                    <XIcon />
                    <span>不正解</span>
                  </>
                )}
              </div>
              {!result.isCorrect && (
                <div className="flex gap-2">
                  <div>正解:</div>
                  <QuizAnswerRenderer quiz={quiz} />
                </div>
              )}
              {quiz.explanation && <Markdown className="max-h-32 overflow-auto">{quiz.explanation}</Markdown>}
            </div>
          )}
          <PlayfulButton
            type="submit"
            className={cn("w-full")}
            tint={result ? (result.isCorrect ? "green" : "red") : "default"}
          >
            {result ? "OK" : "送信"}
          </PlayfulButton>
        </div>
      </form>
    </div>
  );
};
