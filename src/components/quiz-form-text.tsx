"use client";

import { TextQuizData } from "@/lib/quiz-data";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

type Props = {
  quiz: TextQuizData;
  value: string;
  showAnswer: boolean;
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
};

export const QuizFormText = ({ quiz, value, showAnswer, setValue }: Props) => {
  const answers = quiz.answer.split("\n");
  const isCorrect = answers.includes(value);

  return (
    <div className="px-4">
      <Input
        placeholder="回答を入力"
        value={value}
        onChange={(e) => setValue([e.target.value])}
        disabled={showAnswer}
        className={cn("opacity-100!", {
          "border-green-500 bg-green-500/20": showAnswer && isCorrect,
          "border-red-500 bg-red-500/20": showAnswer && !isCorrect,
        })}
      />
    </div>
  );
};
