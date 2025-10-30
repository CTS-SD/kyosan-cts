"use client";

import { Progress } from "@/components/ui/progress";
import { QuizResult } from "@/lib/quiz-form";
import { QuizData } from "@/lib/quiz/data";
import { getQuizPrompt } from "@/lib/quiz/types";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
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
      <header className="bg-background sticky top-0 flex h-12 shrink-0 items-center gap-2 px-4">
        {headerStartContent}
        <div className="grow">
          <Progress value={progress} className="w-full" />
        </div>
        {headerEndContent}
      </header>
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
        <div
          className={cn(
            "bg-background sticky bottom-0 flex flex-col gap-3 p-4",
            {
              "bg-green-100": showAnswer && result?.isCorrect,
              "bg-red-100": showAnswer && !result?.isCorrect,
            },
          )}
        >
          {result && (
            <motion.div
              className={cn(
                "flex flex-col gap-1.5 px-2",
                result.isCorrect ? "text-green-500" : "text-red-500",
              )}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{
                type: "spring",
                stiffness: 800,
                damping: 40,
              }}
            >
              <div
                className={cn(
                  "flex items-center gap-1.5 text-2xl font-bold transition-colors [&_svg]:size-6.5",
                )}
              >
                {result.isCorrect ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
                    </svg>
                    <span>正解</span>
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-6.489 5.8a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" />
                    </svg>
                    <span>不正解</span>
                  </>
                )}
              </div>
              {!result.isCorrect && (
                <div className="flex gap-2">
                  <div className="font-semibold">正解:</div>
                  <QuizAnswerRenderer className="font-bold" quiz={quiz} />
                </div>
              )}
              {/* {quiz.explanation && (
                <Markdown className="max-h-64 overflow-auto">
                  {quiz.explanation}
                </Markdown>
              )} */}
            </motion.div>
          )}
          <PlayfulButton
            type="submit"
            className={cn("w-full")}
            tint={result ? (result.isCorrect ? "green" : "red") : "green"}
          >
            {result ? "次へ" : "送信する"}
          </PlayfulButton>
        </div>
      </form>
    </div>
  );
};
