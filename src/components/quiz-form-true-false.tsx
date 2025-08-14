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
  return (
    <div className="flex gap-4 px-4">
      <OXButton
        isSelected={value === "true"}
        onClick={() => setValue(["true"])}
        disabled={showAnswer}
        isAnswer={quiz.answer}
        showAnswer={showAnswer}
      >
        <CircleIcon />
      </OXButton>
      <OXButton
        isSelected={value === "false"}
        onClick={() => setValue(["false"])}
        disabled={showAnswer}
        isAnswer={!quiz.answer}
        showAnswer={showAnswer}
      >
        <XIcon />
      </OXButton>
    </div>
  );
};

type OXButtonProps = React.ComponentProps<"button"> & {
  isSelected: boolean;
  isAnswer: boolean;
  showAnswer: boolean;
};

const OXButton = ({
  isSelected,
  isAnswer,
  showAnswer,
  className,
  ...props
}: OXButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        "grid aspect-square flex-1 place-content-center rounded-3xl border [&_svg]:size-20",
        isSelected && "bg-primary text-primary-foreground shadow-xl ring",
        {
          "transition-colors": showAnswer,
          "outline-4": showAnswer && isSelected,
          "bg-green-500 outline-green-500/40":
            showAnswer && isAnswer && isSelected,
          "bg-red-500 outline-red-500/40": showAnswer && !isAnswer && isSelected,
        },
        className,
      )}
      {...props}
    />
  );
};
