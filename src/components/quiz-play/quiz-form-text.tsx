"use client";

import { useQuizPlay } from "@/hooks/use-quiz-play";
import type { TextQuizData } from "@/lib/quiz";
import { cn, splitByLines } from "@/lib/utils";
import { PlayfulInput } from "../ui/playful-input";

export const QuizFormText = () => {
  const { result, inputValue, setInputValue, quiz } = useQuizPlay<TextQuizData>();

  const value = inputValue[0] ?? "";
  const showAnswer = !!result;
  const answers = splitByLines(quiz.answer);
  const isCorrect = answers.includes(value.trim());

  return (
    <div className="px-4">
      <PlayfulInput
        placeholder="回答を入力"
        value={value ?? ""}
        onChange={(e) => setInputValue([e.target.value])}
        disabled={showAnswer}
        className={cn("opacity-100!", {
          "border-green-500 bg-green-500/20": showAnswer && isCorrect,
          "border-red-500 bg-red-500/20": showAnswer && !isCorrect,
        })}
      />
    </div>
  );
};
