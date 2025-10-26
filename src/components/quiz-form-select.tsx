"use client";

import { SelectQuizData } from "@/lib/quiz/data";
import { shuffle } from "es-toolkit";
import { useMemo } from "react";
import { PlayfulButton } from "./ui/playful-button";

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
      <div className="flex flex-col gap-2.5">
        {choices.map((choice, i) => {
          const isSelected = value.includes(choice);
          return (
            <PlayfulButton
              variant="outline"
              tint={isSelected ? "blue" : "default"}
              type="button"
              key={`${choice}-${i}`}
              onClick={() => handleChoice(choice)}
              disabled={showAnswer}
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
