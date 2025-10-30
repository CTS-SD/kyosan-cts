"use client";

import { QuizResult } from "@/lib/quiz-form";
import { QuizData } from "@/lib/quiz/data";
import { getQuizPrompt } from "@/lib/quiz/types";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "motion/react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Markdown } from "../markdown";
import { PlayfulButton } from "../ui/playful-button";
import { QuizFormText } from "./quiz-form-text";
import { QuizFormTrueFalse } from "./quiz-form-true-false";
import { QuizPlayHeader } from "./quiz-play-header";
import { QuizPlayResult } from "./quiz-play-result";

const QuizFormSelect = dynamic(
  () => import("@/components/quiz-play/quiz-form-select"),
  {
    ssr: false,
  },
);

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
      <QuizPlayHeader
        startContent={headerStartContent}
        endContent={headerEndContent}
        progress={progress}
      />
      <form onSubmit={handleSubmit} className="flex shrink-0 grow flex-col">
        <div className="grow">
          <div className="mt-2 mb-6 space-y-4 px-6">
            <div className="text-xl font-bold">{getQuizPrompt(quiz.type)}</div>
            <div className="">
              <Markdown>{quiz.question}</Markdown>
            </div>
          </div>
          <div className="pb-4">
            {quiz.type === "select" && (
              <QuizFormSelect
                value={userAnswer}
                setValue={setUserAnswer}
                quiz={quiz}
                result={result}
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
        <div className="sticky bottom-0 flex flex-col gap-3 p-4">
          <PlayfulButton
            type="submit"
            className={cn("w-full")}
            tint={result ? (result.isCorrect ? "green" : "red") : "green"}
          >
            {result ? "次へ" : "送信する"}
          </PlayfulButton>
        </div>
        {result && <QuizPlayResult quiz={quiz} result={result} />}
      </form>
    </div>
  );
};
