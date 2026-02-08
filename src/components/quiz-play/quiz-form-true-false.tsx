"use client";

import { CircleIcon, XIcon } from "lucide-react";
import { useQuizPlay } from "@/ctx/quiz-play";
import type { TrueFalseQuizData } from "@/lib/quiz/data";
import { PlayfulButton } from "../ui/playful-button";

export const QuizFormTrueFalse = () => {
  const { result, value, setValue } = useQuizPlay<TrueFalseQuizData>();

  const showAnswer = !!result;
  const val = (() => {
    const v = value[0];
    if (v === "true") return true;
    if (v === "false") return false;
    return null;
  })();

  const setVal = (v: boolean) => {
    setValue([v ? "true" : "false"]);
  };

  return (
    <div className="flex gap-4 px-4">
      <OXButton isSelected={val === true} onClick={() => setVal(true)} disabled={showAnswer}>
        <CircleIcon />
      </OXButton>
      <OXButton isSelected={val === false} onClick={() => setVal(false)} disabled={showAnswer}>
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
