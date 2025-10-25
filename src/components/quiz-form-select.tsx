"use client";

import { SelectQuizData } from "@/lib/quiz/data";
import { cn } from "@/lib/utils";
import { shuffle } from "es-toolkit";
import { useMemo } from "react";

type Props = {
  quiz: SelectQuizData;
  value: string[];
  showAnswer: boolean;
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
};

export const QuizFormSelect = ({
  quiz,
  value,
  showAnswer,
  setValue,
}: Props) => {
  const correctChoices = useMemo(
    () => quiz.correctChoices ?? [],
    [quiz.correctChoices],
  );
  const incorrectChoices = useMemo(
    () => quiz.incorrectChoices ?? [],
    [quiz.incorrectChoices],
  );

  const choices = useMemo(() => {
    return shuffle(
      [...correctChoices, ...incorrectChoices]
        .map((choice) => choice.trim())
        .filter(Boolean),
    );
  }, [correctChoices, incorrectChoices]);

  const handleChoice = (choice: string) => {
    setValue((prev) =>
      prev.includes(choice)
        ? prev.filter((c) => c !== choice)
        : [...prev, choice],
    );
  };

  return (
    <div className="px-4">
      <div className="flex flex-col gap-2">
        {choices.map((choice, i) => {
          const isSelected = value.includes(choice);
          return (
            <button
              type="button"
              key={`${choice}-${i}`}
              onClick={() => handleChoice(choice)}
              disabled={showAnswer}
              className={cn(
                "flex justify-center rounded-lg leading-tight border border-b-3 px-3 py-2.5 text-start font-semibold transition-all duration-50 active:mb-0.5 active:translate-y-0.5 active:border-b",
                isSelected && "border-blue-300 bg-blue-100/60",
              )}
            >
              {choice}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizFormSelect;
