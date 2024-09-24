"use client";

import { cn, digit2alpha, shuffle } from "@/utils/utils";
import { useContext, useMemo } from "react";
import { QuizFormContext } from "./page";

type Props = {
  quiz: SelectQuiz;
};

const QuizFormSelect = ({ quiz }: Props) => {
  const { value, setValue, isShowResult, showResult } = useContext(QuizFormContext);

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
              "p-4 bg-neutral-100 border-2 font-bold rounded-full transition-transform relative",
              isShowResult &&
                value != selection &&
                "opacity-50",
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
            <div className="absolute top-0 h-full left-2 grid place-content-center">
              <div className="bg-black/10 size-10 rounded-full grid place-content-center">
                {digit2alpha[i] ?? ""}
              </div>
            </div>
            {selection}
          </button>
        );
      })}
    </div>
  );
};

export default QuizFormSelect;
