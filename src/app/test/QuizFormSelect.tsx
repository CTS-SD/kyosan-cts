"use client";

import { cn, shuffle } from "@/utils/utils";
import { useContext, useMemo } from "react";
import { QuizFormContext } from "./page";

type Props = {
  quiz: SelectQuiz;
  showResult: (result: boolean, ans: string) => void;
};

const QuizFormSelect = ({ quiz, showResult }: Props) => {
  const { value, setValue, isShowResult } = useContext(QuizFormContext);

  const selections = useMemo(() => {
    return shuffle([quiz.answer, ...quiz.fakes]);
  }, [quiz]);

  const handleAnswer = (selection: string) => {
    showResult(selection === quiz.answer, selection);
    setValue(selection);
  };

  return (
    <div className="flex flex-col gap-2">
      {selections.map((selection, i) => {
        return (
          <button
            key={i}
            className={cn(
              "p-4 bg-neutral-100 border-2 font-bold rounded-full transition-transform",
              isShowResult &&
                value != selection &&
                "transform scale-95 opacity-50",
              isShowResult &&
                quiz.answer == selection &&
                "bg-green-600 border-green-300 text-white animate-pop",
              isShowResult &&
                quiz.answer != selection &&
                value == selection &&
                "bg-red-600 border-red-300 text-white animate-shake"
            )}
            onClick={() => handleAnswer(selection)}
            disabled={isShowResult}
          >
            {selection}
          </button>
        );
      })}
    </div>
  );
};

export default QuizFormSelect;
