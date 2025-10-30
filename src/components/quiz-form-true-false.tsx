"use client";

import { TrueFalseQuizData } from "@/lib/quiz/data";
import { CircleIcon, XIcon } from "lucide-react";
import { PlayfulButton } from "./ui/playful-button";

type Props = {
  quiz: TrueFalseQuizData;
  value?: boolean;
  showAnswer: boolean;
  setValue: (val: boolean) => void;
};

export const QuizFormTrueFalse = ({
  quiz,
  value,
  showAnswer,
  setValue,
}: Props) => {
  return (
    <div className="flex gap-4 px-4">
      <OXButton
        isSelected={value === true}
        onClick={() => setValue(true)}
        disabled={showAnswer}
      >
        <CircleIcon />
      </OXButton>
      <OXButton
        isSelected={value === false}
        onClick={() => setValue(false)}
        disabled={showAnswer}
      >
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
