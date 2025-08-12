"use client";

import { SelectQuizData } from "@/lib/quiz-data";
import { shuffle } from "es-toolkit";
import { useMemo } from "react";
import { Button } from "./ui/button";

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
  const choices = useMemo(() => {
    return shuffle(
      [
        ...(quiz.correctChoicesText?.split("\n") ?? []),
        ...(quiz.incorrectChoicesText?.split("\n") ?? []),
      ]
        .map((choice) => choice.trim())
        .filter(Boolean),
    );
  }, [quiz.correctChoicesText, quiz.incorrectChoicesText]);

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
            <Button
              type="button"
              key={`${choice}-${i}`}
              size="lg"
              variant={isSelected ? "default" : "outline"}
              onClick={() => handleChoice(choice)}
              disabled={showAnswer}
            >
              {choice}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizFormSelect;
