"use client";

import { cn } from "@/utils/utils";
import { CircleIcon, XIcon } from "lucide-react";
import { useContext } from "react";
import { QuizFormContext } from "./page";
import { Button } from "@/components/ui/button";

type Props = {
  result?: Result;
  onNext: () => void;
  onFinal: () => void;
  isFinal: boolean;
};

const QuizResult = ({ result, onNext, isFinal, onFinal }: Props) => {
  if (!result) return null;

  const answerText = (() => {
    if (typeof result.quiz.answer === "string") {
      return result.quiz.answer;
    }
    if (typeof result.quiz.answer === "boolean") {
      return result.quiz.answer;
    }

    return result.quiz.answer[0];
  })();

  return (
    <div className="shadow-lg border mt-auto bg-neutral-100/60 backdrop-blur-md rounded-3xl p-4  animate-grow-in sticky bottom-4">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "text-3xl flex flex-col gap-1 items-center font-bold  p-10",
            result.correct ? "text-green-600" : "text-red-600"
          )}
        >
          {result.correct ? (
            <>
              <CircleIcon size={82} />
              <div>正解</div>
            </>
          ) : (
            <>
              <XIcon size={82} />
              <div>不正解</div>
            </>
          )}
        </div>
        <div className="mb-10">
          正解は <span className="font-bold text-green-600">{answerText}</span>{" "}
          です。
          {!result.correct && (
            <div className="text-sm p-2">
              あなたの回答：
              <span className="">{result.userAnswer}</span>
            </div>
          )}
        </div>
        {isFinal ? (
          <Button className="w-full" onClick={() => onFinal()}>
            結果を見る
          </Button>
        ) : (
          <Button className="w-full" onClick={() => onNext()}>
            次の問題へ
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizResult;
