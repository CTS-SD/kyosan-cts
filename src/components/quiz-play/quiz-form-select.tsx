"use client";

import { QuizResult } from "@/lib/quiz-form";
import { SelectQuizData } from "@/lib/quiz/data";
import { shuffle } from "es-toolkit";
import { useMemo } from "react";
import { PlayfulButton } from "../ui/playful-button";

type Props = {
  quiz: SelectQuizData;
  value: string[];
  result?: QuizResult | null;
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
};

export const QuizFormSelect = ({ quiz, value, result, setValue }: Props) => {
  const choices = useMemo(() => {
    return shuffle(
      [...quiz.correctChoices, ...quiz.incorrectChoices]
        .map((choice) => choice.trim())
        .filter(Boolean),
    );
  }, [quiz.correctChoices, quiz.incorrectChoices]);

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
          const isHighlighted =
            result?.isCorrect &&
            isSelected &&
            quiz.correctChoices.includes(choice);
          const tint = isHighlighted
            ? "green"
            : isSelected
              ? "blue"
              : "default";
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
