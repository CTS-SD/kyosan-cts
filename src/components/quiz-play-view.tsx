"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FullQuiz } from "@/lib/quiz-actions";
import { QuizResult } from "@/lib/quiz-form";
import { XIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { useState } from "react";

const QuizFormSelect = dynamic(() => import("@/components/quiz-form-select"), {
  ssr: false,
});
const QuizFormText = dynamic(() => import("@/components/quiz-form-text"), {
  ssr: false,
});

type Props = {
  quiz: FullQuiz;
  progress: number;
  addResult: (result: QuizResult) => void;
  onNext?: () => void;
  onQuit?: () => void;
};

const QuizView = ({ quiz, progress, addResult, onNext, onQuit }: Props) => {
  if (!quiz) notFound();

  const [result, setResult] = useState<QuizResult | null>(null);
  const [userAnswer, setUserAnswer] = useState<string[]>([]);

  const showAnswer = !!result;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (showAnswer) return;

    let isCorrect = false;
    if (quiz.type === "select") {
      isCorrect = userAnswer.every((ans) =>
        quiz.correctChoicesText?.split("\n").includes(ans)
      );
    } else if (quiz.type === "text") {
      isCorrect = !!quiz.answer?.split("\n").includes(userAnswer[0]);
    }

    const resultItem = {
      quizId: quiz.id,
      userAnswer,
      isCorrect,
    };

    setResult(resultItem);
    addResult(resultItem);
  };

  const handleNext = () => {
    setResult(null);
    setUserAnswer([]);
    onNext?.();
  };

  return (
    <div className="max-w-xl mx-auto flex flex-col h-[100dvh]">
      <header className="h-12 flex items-center ps-2 pe-6 gap-2">
        <Button size="icon" onClick={onQuit} variant="ghost">
          <XIcon />
        </Button>
        <div className="grow">
          <Progress value={progress} className="w-full" />
        </div>
      </header>
      <form onSubmit={handleSubmit} className="grow flex flex-col">
        <div className="grow">
          <div className="p-4 pt-0">{quiz.question}</div>
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
                value={userAnswer[0]}
                setValue={setUserAnswer}
                quiz={quiz}
                showAnswer={showAnswer}
              />
            )}
          </div>
        </div>
        <div className="p-4">
          {result ? (
            <>
              <div>{result.isCorrect ? "正解" : "不正解"}</div>
              <Button
                type="button"
                onClick={handleNext}
                className="w-full"
                size="lg"
              >
                OK
              </Button>
            </>
          ) : (
            <Button type="submit" className="w-full" size="lg">
              送信
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default QuizView;
