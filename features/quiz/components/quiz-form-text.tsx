"use client";

import type { TextQuizData } from "@/features/quiz";
import { useQuizPlay } from "@/hooks/use-quiz-play";
import { cn } from "@/lib/utils";
import { PlayfulInput } from "../../../components/ui/playful-input";

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
        readOnly={showAnswer}
        className={cn("opacity-100!", {
          "border-green-500 bg-green-500/20": showAnswer && result.isCorrect,
        })}
        autoFocus
      />
    </div>
  );
};
