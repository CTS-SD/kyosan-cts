"use client";

import { cn } from "@/utils/utils";
import { CircleIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  result?: Result;
  onNext: () => void;
  onFinal: () => void;
  isFinal: boolean;
};

const QuizResult = ({ result, onNext, isFinal, onFinal }: Props) => {
  if (!result) return null;

  const answer = (() => {
    if (typeof result.quiz.answer === "string") {
      return result.quiz.answer;
    }
    if (typeof result.quiz.answer === "boolean") {
      return result.quiz.answer ? (
        <CircleIcon size={24} />
      ) : (
        <XIcon size={24} />
      );
    }

    return result.quiz.answer[0];
  })();

  const userAnswer = (() => {
    if (typeof result.userAnswer === "string") {
      return result.userAnswer;
    }
    if (typeof result.userAnswer === "boolean") {
      return result.userAnswer ? <CircleIcon size={16} /> : <XIcon size={16} />;
    }

    return result.userAnswer[0];
  })();

  return (
    <div className="shadow-lg border mt-auto bg-neutral-100/60 backdrop-blur-md rounded-3xl p-4  animate-grow-in sticky bottom-4">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "text-3xl flex flex-col gap-1 items-center font-bold pt-6 pb-10",
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
        <div className="mb-10 flex flex-col items-center">
          <div className="flex items-center">
            <div>正解：</div>
            <span className="font-bold text-green-600">{answer}</span>
          </div>
          {!result.correct && (
            <div className="text-sm flex items-center p-2 text-muted-foreground">
              <div>あなたの回答：</div>
              <span className="">{userAnswer}</span>
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
