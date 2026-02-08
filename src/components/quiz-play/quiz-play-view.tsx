"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { QuizPlayContext } from "@/ctx/quiz-play";
import type { QuizData } from "@/lib/quiz/data";
import { judgeQuiz } from "@/lib/quiz/judge";
import { getQuizPrompt } from "@/lib/quiz/types";
import type { QuizResult } from "@/lib/quiz-form";
import { cn } from "@/lib/utils";
import { Markdown } from "../markdown";
import { PlayfulButton } from "../ui/playful-button";
import { QuizFormSelect } from "./quiz-form-select";
import { QuizFormText } from "./quiz-form-text";
import { QuizFormTrueFalse } from "./quiz-form-true-false";
import { QuizPlayHeader } from "./quiz-play-header";
import { QuizPlayResult } from "./quiz-play-result";

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
  const [inputValue, setInputValue] = useState<string[]>([]);

  const showAnswer = !!result;

  const reset = () => {
    setResult(null);
    setInputValue([]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (showAnswer) {
      reset();
      onNext?.();
      return;
    }

    const resultItem = {
      quizId: quiz.id,
      userAnswer: inputValue,
      isCorrect: judgeQuiz(quiz, inputValue),
    };
    setResult(resultItem);
    addResult?.(resultItem);
  };

  return (
    <QuizPlayContext.Provider value={{ inputValue, setInputValue, quiz, result }}>
      <div className={cn("mx-auto flex h-full max-w-xl grow flex-col", className)} {...props}>
        <QuizPlayHeader startContent={headerStartContent} endContent={headerEndContent} progress={progress} />
        <form onSubmit={handleSubmit} className="flex shrink-0 grow flex-col">
          <div className="grow">
            <div className="mt-2 mb-6 space-y-4 px-6">
              <div className="font-bold text-xl">{getQuizPrompt(quiz)}</div>
              <div className="">
                <Markdown>{quiz.question}</Markdown>
              </div>
            </div>
            <div className="pb-4">
              {quiz.type === "select" && <QuizFormSelect />}
              {quiz.type === "text" && <QuizFormText />}
              {quiz.type === "true_false" && <QuizFormTrueFalse />}
            </div>
          </div>
          <div
            className={cn("sticky bottom-0 bg-background backdrop-blur-lg", {
              "border-green-100 border-t-2 bg-green-50 dark:border-border dark:bg-background":
                showAnswer && result.isCorrect,
              "border-red-100 border-t-2 bg-red-50 dark:border-border dark:bg-background":
                showAnswer && !result.isCorrect,
            })}
          >
            <div className={cn("flex flex-col gap-3 p-4")}>
              {result && <QuizPlayResult />}
              <PlayfulButton
                type="submit"
                className="z-10 w-full"
                tint={result ? (result.isCorrect ? "green" : "red") : "green"}
              >
                {result ? "次へ" : "送信する"}
              </PlayfulButton>
            </div>
          </div>
        </form>
      </div>
    </QuizPlayContext.Provider>
  );
};
