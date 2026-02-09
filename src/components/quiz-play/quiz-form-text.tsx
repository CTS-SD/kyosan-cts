"use client";

import { useQuizPlay } from "@/hooks/use-quiz-play";
import type { TextQuizData } from "@/lib/quiz";
import { cn } from "@/lib/utils";
import { PlayfulInput } from "../ui/playful-input";

export const QuizFormText = () => {
  const { result, inputValue, setInputValue } = useQuizPlay<TextQuizData>();

  const value = inputValue[0] ?? "";
  const showAnswer = !!result;

  return (
    <div className="px-4">
      <PlayfulInput
        placeholder="回答を入力"
        value={value ?? ""}
        onChange={(e) => setInputValue([e.target.value])}
        disabled={showAnswer}
        className={cn("opacity-100!", {
          "border-green-500 bg-green-500/20": showAnswer && result.isCorrect,
        })}
      />
    </div>
  );
};
