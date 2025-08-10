"use client";

import { FullQuiz } from "@/lib/quiz-actions";
import { cn } from "@/lib/utils";
import { CircleIcon, XIcon } from "lucide-react";

type Props = {
  quiz: FullQuiz;
  value: string;
  showAnswer: boolean;
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
};

export const QuizFormTrueFalse = ({
  quiz,
  value,
  showAnswer,
  setValue,
}: Props) => {
  if (quiz?.type !== "true_false") return null;

  return (
    <div className="px-4 flex gap-4">
      <OXButton
        isSelected={value === "true"}
        onClick={() => setValue(["true"])}
        disabled={showAnswer}
      >
        <CircleIcon />
      </OXButton>
      <OXButton
        isSelected={value === "false"}
        onClick={() => setValue(["false"])}
        disabled={showAnswer}
      >
        <XIcon />
      </OXButton>
    </div>
  );
};

type OXButtonProps = React.ComponentProps<"button"> & {
  isSelected?: boolean;
};

const OXButton = ({ isSelected, ...props }: OXButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        "flex-1 aspect-square rounded-3xl transition-all grid place-content-center [&_svg]:size-20 border",
        isSelected &&
          "bg-primary text-primary-foreground shadow-lg ring ring-offset-2 ring-primary"
      )}
      {...props}
    />
  );
};
