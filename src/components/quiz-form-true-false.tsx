"use client";

import { TrueFalseQuizData } from "@/lib/quiz-data";
import { cn } from "@/lib/utils";
import { CircleIcon, XIcon } from "lucide-react";

type Props = {
  quiz: TrueFalseQuizData;
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
    <div className="flex gap-4 px-4">
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
        "grid aspect-square flex-1 place-content-center rounded-3xl border transition-all [&_svg]:size-20",
        isSelected &&
          "bg-primary text-primary-foreground ring-primary shadow-lg ring ring-offset-2",
      )}
      {...props}
    />
  );
};
