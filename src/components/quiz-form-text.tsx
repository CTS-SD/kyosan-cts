"use client";

import { FullQuiz } from "@/lib/quiz-actions";
import { Input } from "./ui/input";

type Props = {
  quiz: FullQuiz;
  value: string;
  showAnswer: boolean;
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
};

const QuizFormText = ({ quiz, value, showAnswer, setValue }: Props) => {
  if (quiz?.type !== "text") return null;

  return (
    <div className="px-4">
      <Input
        placeholder="回答を入力"
        value={value}
        onChange={(e) => setValue([e.target.value])}
        disabled={showAnswer}
      />
    </div>
  );
};

export default QuizFormText;
