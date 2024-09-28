"use client";

import { cn, digit2alpha, shuffle } from "@/utils/utils";
import { useContext, useMemo } from "react";
import { QuizFormContext } from "./QuizFormContext";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/db/schema";

type Props = {
  quiz: Quiz;
};

const QuizFormSelect = ({ quiz }: Props) => {
  const { value, setValue, isShowResult, showResult, isPreview } =
    useContext(QuizFormContext);

  const selections = useMemo(() => {
    return shuffle([quiz.answer, ...(quiz.fakes ?? [])]);
  }, [quiz]);

  const handleSubmit = () => {
    if (value == null) return;
    showResult(value === quiz.answer, value);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        {selections.map((selection, i) => {
          return (
            <button
              key={i}
              className={cn(
                "p-4 bg-neutral-100 border-2 font-bold rounded-full transition-transform relative",
                value == selection &&
                  "animate-pop bg-blue-100 text-blue-500 border-blue-300 [&_.badge]:bg-blue-200",
                isShowResult && value != selection && "opacity-50",
                isShowResult &&
                  quiz.answer == selection &&
                  "bg-green-100 border-green-300 text-green-500 animate-pop [&_.badge]:bg-green-200",
                isShowResult &&
                  quiz.answer != selection &&
                  value == selection &&
                  "bg-red-100 border-red-300 text-red-500 animate-shake [&_.badge]:bg-red-200"
              )}
              onClick={() => setValue(selection)}
              disabled={isShowResult}
            >
              <div className="absolute top-0 h-full left-2 grid place-content-center">
                <div
                  className={cn(
                    "bg-black/10 size-10 rounded-full text-black grid place-content-center badge"
                  )}
                >
                  {digit2alpha[i] ?? ""}
                </div>
              </div>
              {selection}
            </button>
          );
        })}
      </div>
      {!isShowResult && !isPreview && (
        <Button
          onClick={() => handleSubmit()}
          className="absolute bottom-4 right-4 left-4"
          disabled={value === null}
        >
          決定
        </Button>
      )}
    </>
  );
};

export default QuizFormSelect;
