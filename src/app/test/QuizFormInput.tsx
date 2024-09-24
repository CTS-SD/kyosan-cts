import { useContext, useState } from "react";
import { QuizFormContext } from "./page";
import { cn } from "@/utils/utils";
import { Button } from "@/components/ui/button";

type Props = {
  quiz: InputQuiz;
};

const QuizFormInput = ({ quiz }: Props) => {
  const { value, setValue, isShowResult, showResult } =
    useContext(QuizFormContext);

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
        <Button className="w-full mt-4" disabled={isShowResult}>
          決定
        </Button>
      </form>
    </div>
  );
};

export default QuizFormInput;
