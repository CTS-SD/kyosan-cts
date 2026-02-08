"use client";

import { shuffle } from "es-toolkit";
import { useMemo } from "react";
import { useQuizPlay } from "@/ctx/quiz-play";
import type { SelectQuizData } from "@/lib/quiz/data";
import { PlayfulButton } from "../ui/playful-button";

export const QuizFormSelect = () => {
  const { result, value: selections, setValue, quiz } = useQuizPlay<SelectQuizData>();

  const choices = useMemo(() => {
    return shuffle([...quiz.correctChoices, ...quiz.incorrectChoices].map((choice) => choice.trim()).filter(Boolean));
  }, [quiz.correctChoices, quiz.incorrectChoices]);

  const handleChoice = (choice: string) => {
    if (selections.includes(choice)) {
      setValue((prev) => prev.filter((c) => c !== choice));
      return;
    }

    if (selections.length === quiz.correctChoices.length) {
      setValue((prev) => [...prev.slice(0, -1), choice]);
      return;
    }

    setValue((prev) => [...prev, choice]);
  };

  return (
    <div className="px-4">
      <div className="flex flex-col gap-2.5">
        {choices.map((choice) => {
          const isSelected = selections.includes(choice);
          const isHighlighted = result?.isCorrect && isSelected && quiz.correctChoices.includes(choice);
          const tint = isHighlighted ? "green" : isSelected ? "blue" : "default";
          return (
            <PlayfulButton
              variant="outline"
              type="button"
              tint={tint}
              key={`${quiz.id}-${choice}`}
              onClick={() => handleChoice(choice)}
              disabled={!!result}
            >
              {choice}
            </PlayfulButton>
          );
        })}
      </div>
    </div>
  );
};
