"use client";

import { CircleIcon, XIcon } from "lucide-react";
import { useQuizPlay } from "@/hooks/use-quiz-play";
import type { TrueFalseQuizData } from "@/lib/quiz";
import { PlayfulButton } from "../ui/playful-button";

export const QuizFormTrueFalse = () => {
  const { result, inputValue, setInputValue } = useQuizPlay<TrueFalseQuizData>();

  const showAnswer = !!result;
  const value = (() => {
    const v = inputValue[0];
    if (v === "true") return true;
    if (v === "false") return false;
    return null;
  })();

  const setValue = (v: boolean) => {
    setInputValue([v ? "true" : "false"]);
  };

  return (
    <div className="flex gap-4 px-4">
      <OXButton isSelected={value === true} onClick={() => setValue(true)} disabled={showAnswer}>
        <CircleIcon />
      </OXButton>
      <OXButton isSelected={value === false} onClick={() => setValue(false)} disabled={showAnswer}>
        <XIcon />
      </OXButton>
    </div>
  );
};

type OXButtonProps = React.ComponentProps<typeof PlayfulButton> & {
  isSelected: boolean;
};

const OXButton = ({ isSelected, className, ...props }: OXButtonProps) => {
  return (
    <PlayfulButton
      variant="outline"
      tint={isSelected ? "blue" : "default"}
      className="relative flex aspect-square flex-1 items-center justify-center rounded-2xl [&_svg]:size-1/2"
      type="button"
      {...props}
    />
  );
};
