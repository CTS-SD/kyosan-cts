"use client";

import { useState } from "react";
import { QuizPlayContext, useQuizPlay } from "../../hooks/use-quiz-play";
import type { QuizData, QuizResult } from "../../lib/quiz";
import { getQuizPrompt, judgeQuizInput, validateQuizInput } from "../../lib/quiz";
import { cn } from "../../lib/utils";
import { Markdown } from "../markdown";
import { PlayfulButton } from "../ui/playful-button";
import { QuizFormSelect } from "./quiz-form-select";
import { QuizFormText } from "./quiz-form-text";
import { QuizFormTrueFalse } from "./quiz-form-true-false";
import { QuizPlayResult } from "./quiz-play-result";

type Props = React.ComponentProps<"div"> & {
  quiz: QuizData;
  onAnswer?: (result: QuizResult) => void;
  onNext?: () => void;
};

export const QuizPlayRoot = ({ quiz, onAnswer, onNext, className, ...props }: Props) => {
  const [result, setResult] = useState<QuizResult | null>(null);
  const [inputValue, setInputValue] = useState<string[]>([]);

  const isValidInput = validateQuizInput(quiz, inputValue);

  return (
    <QuizPlayContext.Provider
      value={{ inputValue, setInputValue, quiz, result, setResult, isValidInput, onAnswer, onNext }}
    >
      <div
        className={cn("mx-auto flex h-full max-w-xl grow flex-col overflow-auto bg-background", className)}
        {...props}
      ></div>
    </QuizPlayContext.Provider>
  );
};

export const QuizPlayHeader = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn("sticky top-0 z-10 flex h-12 shrink-0 items-center gap-2 bg-background px-4", className)}
      {...props}
    />
  );
};

export const QuizPlayContent = () => {
  const { quiz, setInputValue, setResult, result, inputValue, onNext, onAnswer } = useQuizPlay();

  const showAnswer = !!result;

  const isValidInput = validateQuizInput(quiz, inputValue);

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
      isCorrect: judgeQuizInput(quiz, inputValue),
    };
    setResult(resultItem);
    onAnswer?.(resultItem);
  };

  return (
    <form onSubmit={handleSubmit} className="flex shrink-0 grow flex-col">
      <div className="mt-2 mb-6 space-y-4 px-6">
        <div className="font-bold text-xl">{getQuizPrompt(quiz)}</div>
        <Markdown>{quiz.question}</Markdown>
      </div>
      <div className="grow pb-4">
        {quiz.type === "select" && <QuizFormSelect />}
        {quiz.type === "text" && <QuizFormText />}
        {quiz.type === "true_false" && <QuizFormTrueFalse />}
      </div>
      <div
        className={cn("sticky bottom-0 bg-background backdrop-blur-lg", {
          "border-green-100 border-t-2 bg-green-50 dark:border-border dark:bg-background":
            showAnswer && result.isCorrect,
          "border-red-100 border-t-2 bg-red-50 dark:border-border dark:bg-background": showAnswer && !result.isCorrect,
        })}
      >
        <div className={cn("flex flex-col gap-3 p-4")}>
          {result && <QuizPlayResult />}
          <PlayfulButton
            type="submit"
            className="z-10 w-full"
            disabled={!isValidInput && !showAnswer}
            tint={showAnswer ? (result.isCorrect ? "green" : "red") : isValidInput ? "green" : "disabled"}
          >
            {result ? "次へ" : "送信する"}
          </PlayfulButton>
        </div>
      </div>
    </form>
  );
};

export const QuizPlay = {
  Root: QuizPlayRoot,
  Header: QuizPlayHeader,
  Content: QuizPlayContent,
};
