"use client";

import { FullQuiz } from "@/lib/quiz-actions";
import { shuffle } from "es-toolkit";
import { useMemo } from "react";
import { Button } from "./ui/button";

type Props = {
  quiz: FullQuiz;
  value: string[];
  showAnswer: boolean;
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
};

const SelectQuizForm = ({ quiz, value, showAnswer, setValue }: Props) => {
  if (quiz?.type !== "select") return null;

  const choices = useMemo(() => {
    return shuffle(
      [
        ...(quiz.correctChoicesText?.split("\n") ?? []),
        ...(quiz.incorrectChoicesText?.split("\n") ?? []),
      ]
        .map((choice) => choice.trim())
        .filter(Boolean)
    );
  }, [quiz]);

  const handleChoice = (choice: string) => {
    setValue((prev) =>
      prev.includes(choice)
        ? prev.filter((c) => c !== choice)
        : [...prev, choice]
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
              key={choice}
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

export default SelectQuizForm;
