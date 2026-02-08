"use client";

import { shuffle } from "es-toolkit";
import { useMemo } from "react";
import { useQuizPlay } from "@/ctx/quiz-play";
import type { SelectQuizData } from "@/lib/quiz";
import { PlayfulButton } from "../ui/playful-button";

export const QuizFormSelect = () => {
  const { result, inputValue: selections, setInputValue: setSelections, quiz } = useQuizPlay<SelectQuizData>();

  const choices = useMemo(() => {
    return shuffle([...quiz.correctChoices, ...quiz.incorrectChoices].map((choice) => choice.trim()).filter(Boolean));
  }, [quiz.correctChoices, quiz.incorrectChoices]);

  const handleChoice = (choice: string) => {
    if (selections.includes(choice)) {
      setSelections((prev) => prev.filter((c) => c !== choice));
      return;
    }

    if (selections.length === quiz.correctChoices.length) {
      setSelections((prev) => [...prev.slice(0, -1), choice]);
      return;
    }

    setSelections((prev) => [...prev, choice]);
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
