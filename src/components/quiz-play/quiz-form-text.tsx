"use client";

import { useQuizPlay } from "@/ctx/quiz-play";
import type { TextQuizData } from "@/lib/quiz/data";
import { cn, splitByLines } from "@/lib/utils";
import { Input } from "../ui/input";

type Props = {
  quiz: TextQuizData;
};

export const QuizFormText = ({ quiz }: Props) => {
  const { result, value, setValue } = useQuizPlay();

  const val = value[0] ?? "";
  const showAnswer = !!result;
  const answers = splitByLines(quiz.answer);
  const isCorrect = answers.includes(val.trim());

  return (
    <div className="px-4">
      <Input
        placeholder="回答を入力"
        value={val ?? ""}
        onChange={(e) => setValue([e.target.value])}
        disabled={showAnswer}
        className={cn("opacity-100!", {
          "border-green-500 bg-green-500/20": !!result && isCorrect,
          "border-red-500 bg-red-500/20": !!result && !isCorrect,
        })}
      />
    </div>
  );
};
