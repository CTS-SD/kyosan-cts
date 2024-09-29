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
                "relative flex justify-center rounded-full border-2 bg-neutral-100 px-6 py-5 font-bold transition-transform",
                value == selection &&
                  "animate-pop border-blue-300 bg-blue-100 text-blue-500 [&_.badge]:bg-blue-200",
                isShowResult && value != selection && "opacity-50",
                isShowResult &&
                  quiz.answer == selection &&
                  "animate-pop border-green-300 bg-green-100 text-green-500 [&_.badge]:bg-green-200",
                isShowResult &&
                  quiz.answer != selection &&
                  value == selection &&
                  "animate-shake border-red-300 bg-red-100 text-red-500 [&_.badge]:bg-red-200",
              )}
              onClick={() => setValue(selection)}
              disabled={isShowResult}
            >
              <div className="text-left leading-tight">
                {selection.length > 0 ? selection : "　"}
              </div>
            </button>
          );
        })}
      </div>
      {!isShowResult && (
        <Button
          variant="primary"
          size="xl"
          onClick={() => handleSubmit()}
          className="sticky mt-auto w-full"
          disabled={value === null}
        >
          決定
        </Button>
      )}
    </>
  );
};

export default QuizFormSelect;
