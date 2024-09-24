import { useContext, useState } from "react";
import { QuizFormContext } from "./page";
import { cn } from "@/utils/utils";

type Props = {
  quiz: InputQuiz;
  showResult: (result: boolean, ans: string) => void;
};

const QuizFormInput = ({ quiz, showResult }: Props) => {
  const { value, setValue, isShowResult } = useContext(QuizFormContext);

  const handleAnswer = () => {
    if (!value) return;

    const cleanValue = (value as string).trim();
    const correct =
      typeof quiz.answer === "string"
        ? quiz.answer === cleanValue
        : quiz.answer.includes(cleanValue);

    showResult(correct, cleanValue);
  };

  return (
    <div className="">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAnswer();
        }}
      >
        <input
          value={typeof value == "string" ? value : ""}
          onChange={(e) => setValue(e.currentTarget.value)}
          className={cn(
            "py-4 px-6 font-bold bg-neutral-100 rounded-full w-full border-2",
            isShowResult &&
              (quiz.answer === value
                ? "bg-green-100 border-green-300 animate-pop"
                : "bg-red-100 border-red-300 animate-shake")
          )}
          disabled={isShowResult}
          placeholder="回答を入力"
        />
        <button
          className="p-4 bg-blue-600 text-white font-bold w-full rounded-full mt-2 disabled:opacity-50"
          disabled={isShowResult}
        >
          決定
        </button>
      </form>
    </div>
  );
};

export default QuizFormInput;
