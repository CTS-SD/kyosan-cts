"use client";

import { cn, getAnswerElement } from "@/utils/utils";
import { CircleIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Result } from "./page";

type Props = {
  result?: Result;
  onNext: () => void;
  onFinal: () => void;
  isFinal: boolean;
};

const QuizResult = ({ result, onNext, isFinal, onFinal }: Props) => {
  if (!result) return null;

  return (
    <div
      className={cn(
        "shadow-lg mt-auto border-2 backdrop-blur-md bg-white rounded-3xl p-4  animate-grow-in sticky bottom-4"
      )}
    >
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "text-3xl flex flex-col gap-1 items-center font-bold pt-6 pb-10",
            result.correct ? "text-green-500" : "text-red-500"
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
        <div className="mb-10 flex flex-col items-center">
          <div className="flex items-center">
            <div>正解：</div>
            <span className="font-bold text-green-500">
              {getAnswerElement(result.quiz.answer)}
            </span>
          </div>
          {!result.correct && (
            <div className="text-sm flex items-center p-2 text-muted-foreground">
              <div>あなたの回答：</div>
              <span className="">{getAnswerElement(result.userAnswer)}</span>
            </div>
          )}
        </div>
        {isFinal ? (
          <Button className="w-full animate-pulse" onClick={() => onFinal()}>
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
