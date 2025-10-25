import { QuizData } from "@/lib/quiz/data";
import { cn } from "@/lib/utils";
import { CircleIcon, XIcon } from "lucide-react";

type Props = React.ComponentProps<"div"> & {
  quiz: QuizData;
};

export const QuizAnswerRenderer = ({ quiz, className, ...props }: Props) => {
  return (
    <div className={cn("[&_svg]:h-lh", className)} {...props}>
      {quiz.type === "select" && quiz.correctChoices.join(", ")}
      {quiz.type === "text" && quiz.answer.replace(/\n/g, ", ")}
      {quiz.type === "true_false" && quiz.answer && <CircleIcon />}
      {quiz.type === "true_false" && !quiz.answer && <XIcon />}
    </div>
  );
};
