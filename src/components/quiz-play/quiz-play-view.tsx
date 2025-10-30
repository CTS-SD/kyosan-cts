"use client";

import { QuizPlayContext } from "@/ctx/quiz-play";
import { QuizResult } from "@/lib/quiz-form";
import { QuizData } from "@/lib/quiz/data";
import { judgeQuiz } from "@/lib/quiz/judge";
import { getQuizPrompt } from "@/lib/quiz/types";
import { cn } from "@/lib/utils";
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

  const reset = () => {
    setResult(null);
    setUserAnswer([]);
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
      userAnswer,
      isCorrect: judgeQuiz(quiz, userAnswer),
    };
    setResult(resultItem);
    addResult?.(resultItem);
  };

  return (
    <QuizPlayContext.Provider
      value={{ value: userAnswer, setValue: setUserAnswer, quiz, result }}
    >
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
              <div className="text-xl font-bold">{getQuizPrompt(quiz)}</div>
              <div className="">
                <Markdown>{quiz.question}</Markdown>
              </div>
            </div>
            <div className="pb-4">
              {quiz.type === "select" && <QuizFormSelect quiz={quiz} />}
              {quiz.type === "text" && <QuizFormText quiz={quiz} />}
              {quiz.type === "true_false" && <QuizFormTrueFalse quiz={quiz} />}
            </div>
          </div>
          <div
            className={cn("bg-background sticky bottom-0 backdrop-blur-lg", {
              "dark:bg-background dark:border-border border-t-2 border-green-100 bg-green-50":
                showAnswer && result.isCorrect,
              "dark:bg-background dark:border-border border-t-2 border-red-100 bg-red-50":
                showAnswer && !result.isCorrect,
            })}
          >
            <div className={cn("flex flex-col gap-3 p-4")}>
              {result && <QuizPlayResult quiz={quiz} result={result} />}
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
