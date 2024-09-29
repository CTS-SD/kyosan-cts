"use client";

import { cn, getAnswerElement } from "@/utils/utils";
import { CircleIcon, LightbulbIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Result } from "./page";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
        "sticky bottom-2 -mx-2 mt-auto animate-grow-in rounded-xl border bg-white p-4 shadow-lg backdrop-blur-md",
      )}
    >
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "flex flex-col items-center gap-1 pb-10 pt-6 text-3xl font-bold",
            result.correct ? "text-green-500" : "text-red-500",
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
            <div className="flex items-center p-2 text-sm text-muted-foreground">
              <div>あなたの回答：</div>
              <span className="">{getAnswerElement(result.userAnswer)}</span>
            </div>
          )}
        </div>
        {result.quiz.explanation && (
          <div className="mb-4 flex w-full gap-1.5 rounded-xl bg-blue-50 p-6 text-blue-600">
            <LightbulbIcon size={20} className="mt-0.5 shrink-0" />
            <div className="question-md !bg-inherit font-semibold !text-inherit">
              <Markdown remarkPlugins={[remarkGfm]}>
                {result.quiz.explanation}
              </Markdown>
            </div>
          </div>
        )}
        {isFinal ? (
          <Button
            variant="primary"
            size="xl"
            className="w-full animate-pulse"
            onClick={() => onFinal()}
          >
            結果を見る
          </Button>
        ) : (
          <Button
            variant="primary"
            size="xl"
            className="w-full"
            onClick={() => onNext()}
          >
            次の問題へ
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizResult;
