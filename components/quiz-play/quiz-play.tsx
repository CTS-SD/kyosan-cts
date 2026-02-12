"use client";

import { CornerDownLeftIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { QuizPlayContext, useQuizPlay } from "@/hooks/use-quiz-play";
import type { QuizData, QuizResult } from "@/lib/quiz";
import { getQuizPrompt, judgeQuizInput, validateQuizInput } from "@/lib/quiz";
import { cn } from "@/lib/utils";
import { Markdown } from "../markdown";
import { PlayfulButton } from "../ui/playful-button";
import { QuizFormSelect } from "./quiz-form-select";
import { QuizFormText } from "./quiz-form-text";
import { QuizFormTrueFalse } from "./quiz-form-true-false";
import { QuizPlayResult } from "./quiz-play-result";

export const QuizPlayProvider = ({
  children,
  quiz,
  onAnswer,
  onNext,
  enableKeyboard = false,
}: {
  children: React.ReactNode;
  quiz: QuizData;
  onAnswer?: (result: QuizResult) => void;
  onNext?: () => void;
  enableKeyboard?: boolean;
}) => {
  const [result, setResult] = useState<QuizResult | null>(null);
  const [inputValue, setInputValue] = useState<string[]>([]);
  const choicesRef = useRef<string[]>([]);

  const isValidInput = validateQuizInput(quiz, inputValue);

  return (
    <QuizPlayContext.Provider
      value={{
        inputValue,
        setInputValue,
        quiz,
        result,
        setResult,
        isValidInput,
        onAnswer,
        onNext,
        enableKeyboard,
        choicesRef,
      }}
    >
      {children}
    </QuizPlayContext.Provider>
  );
};

export const QuizPlayContent = () => {
  const { quiz, setResult, result, inputValue, setInputValue, onNext, onAnswer, enableKeyboard, choicesRef } =
    useQuizPlay();

  const formRef = useRef<HTMLFormElement>(null);
  const showAnswer = !!result;

  const isValidInput = validateQuizInput(quiz, inputValue);

  // Auto-focus form when keyboard shortcuts are enabled
  useEffect(() => {
    if (enableKeyboard) {
      formRef.current?.focus();
    }
  }, [enableKeyboard]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (showAnswer) {
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (!enableKeyboard) return;

    // Enter: submit form (skip if target is an input element — it submits naturally)
    if (e.key === "Enter") {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT") return;

      // Don't submit if input is invalid and no result shown
      if (!isValidInput && !showAnswer) return;

      e.preventDefault();
      formRef.current?.requestSubmit();
      return;
    }

    // Number keys 1-9: toggle select choices
    if (quiz.type === "select" && !showAnswer) {
      const num = Number.parseInt(e.key, 10);
      if (num >= 1 && num <= 9) {
        const choices = choicesRef.current;
        const choice = choices[num - 1];
        if (!choice) return;

        e.preventDefault();
        setInputValue((prev) => {
          if (prev.includes(choice)) {
            return prev.filter((c) => c !== choice);
          }
          if (prev.length === (quiz as { correctChoices: string[] }).correctChoices.length) {
            return [...prev.slice(0, -1), choice];
          }
          return [...prev, choice];
        });
        return;
      }
    }

    // Arrow keys: toggle true/false
    if (quiz.type === "true_false" && !showAnswer) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setInputValue(["true"]);
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setInputValue(["false"]);
        return;
      }
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
      tabIndex={enableKeyboard ? -1 : undefined}
      className={cn("flex shrink-0 grow flex-col outline-0")}
    >
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
        className={cn("sticky bottom-0 rounded-b-2xl bg-background backdrop-blur-lg", {
          "border-green-100 border-t-2 bg-green-50 dark:border-border dark:bg-background":
            showAnswer && result.isCorrect,
          "border-red-100 border-t-2 bg-red-50 dark:border-border dark:bg-background": showAnswer && !result.isCorrect,
        })}
      >
        <div className={cn("flex flex-col gap-3 p-4")}>
          {result && <QuizPlayResult />}
          <PlayfulButton
            type="submit"
            className="relative z-10 w-full"
            disabled={!isValidInput && !showAnswer}
            tint={showAnswer ? (result.isCorrect ? "green" : "red") : isValidInput ? "green" : "disabled"}
          >
            {result ? "次へ" : "送信する"}
            {enableKeyboard && (
              <CornerDownLeftIcon strokeWidth={2.6} className="absolute right-4 pointer-fine::hidden opacity-60" />
            )}
          </PlayfulButton>
        </div>
      </div>
    </form>
  );
};

export const QuizPlay = {
  Provider: QuizPlayProvider,
  Content: QuizPlayContent,
};
