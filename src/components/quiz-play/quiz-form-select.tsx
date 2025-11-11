"use client";

import { useQuizPlay } from "@/ctx/quiz-play";
import { SelectQuizData } from "@/lib/quiz/data";
import { shuffle } from "es-toolkit";
import { useMemo } from "react";
import { PlayfulButton } from "../ui/playful-button";

type Props = {
  quiz: SelectQuizData;
};

export const QuizFormSelect = ({ quiz }: Props) => {
  const { result, value: selections, setValue } = useQuizPlay();

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
        {choices.map((choice, i) => {
          const isSelected = selections.includes(choice);
          const isHighlighted = result?.isCorrect && isSelected && quiz.correctChoices.includes(choice);
          const tint = isHighlighted ? "green" : isSelected ? "blue" : "default";
          return (
            <PlayfulButton
              variant="outline"
              type="button"
              tint={tint}
              key={`${choice}-${i}`}
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

export default QuizFormSelect;
