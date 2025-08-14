"use client";

import { SelectQuizData } from "@/lib/quiz-data";
import { cn } from "@/lib/utils";
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
  const correctChoices = quiz.correctChoicesText?.split("\n") ?? [];
  const incorrectChoices = quiz.incorrectChoicesText?.split("\n") ?? [];

  const choices = useMemo(() => {
    return shuffle(
      [...correctChoices, ...incorrectChoices]
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
          const isAnswer = correctChoices.includes(choice);
          return (
            <Button
              type="button"
              key={`${choice}-${i}`}
              size="lg"
              variant={isSelected ? "default" : "outline"}
              onClick={() => handleChoice(choice)}
              disabled={showAnswer}
              className={cn("opacity-100!", {
                "bg-red-500": showAnswer && !isAnswer && isSelected,
                "bg-green-500!": showAnswer && isAnswer,
              })}
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
