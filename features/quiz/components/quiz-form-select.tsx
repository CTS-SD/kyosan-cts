"use client";

import { shuffle } from "es-toolkit";
import { useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { PlayfulButton } from "../../../components/ui/playful-button";
import type { SelectQuizData } from "../domain/types";
import { useQuizPlay } from "./quiz-play";

export const QuizFormSelect = () => {
  const {
    result,
    inputValue: selections,
    setInputValue: setSelections,
    quiz,
    choicesRef,
    enableKeyboard,
  } = useQuizPlay<SelectQuizData>();

  const correctKey = quiz.correctChoices.join("\n");
  const incorrectKey = quiz.incorrectChoices.join("\n");

  // biome-ignore lint/correctness/useExhaustiveDependencies: The dependencies are correct.
  const choices = useMemo(() => {
    return shuffle([...quiz.correctChoices, ...quiz.incorrectChoices].map((choice) => choice.trim()).filter(Boolean));
  }, [correctKey, incorrectKey]);

  useEffect(() => {
    choicesRef.current = choices;
  }, [choices, choicesRef]);

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
      <div className="relative flex flex-col gap-2.5">
        {choices.map((choice, index) => {
          const isSelected = selections.includes(choice);
          const isHighlighted = result?.isCorrect && isSelected && quiz.correctChoices.includes(choice);
          const tint = isHighlighted ? "green" : isSelected ? "blue" : "default";
          return (
            <PlayfulButton
              variant="outline"
              type="button"
              tint={tint}
              key={`${quiz.id}-${index}`}
              onClick={() => handleChoice(choice)}
              className={cn("relative", enableKeyboard && index < 9 && "pointer-fine:pl-12")}
              disabled={!!result}
            >
              {enableKeyboard && index < 9 && (
                <div className="absolute left-2.5 grid pointer-coarse:hidden size-7 place-content-center rounded-md bg-current/10 text-sm! opacity-40">
                  {index + 1}
                </div>
              )}
              {choice}
            </PlayfulButton>
          );
        })}
      </div>
    </div>
  );
};
