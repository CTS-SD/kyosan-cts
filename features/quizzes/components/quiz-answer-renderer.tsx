import { CircleIcon, XIcon } from "lucide-react";
import type { Quiz } from "@/features/quizzes/types";

export const QuizAnswerRenderer = ({
  quiz,
  includeAlternatives = false,
}: {
  quiz: Quiz;
  includeAlternatives?: boolean;
}) => {
  return (
    <>
      {quiz.type === "select" && quiz.params.correctChoices.join(", ")}
      {quiz.type === "text" &&
        (includeAlternatives ? quiz.params.answer.replace(/\n/g, ", ") : quiz.params.answer.split("\n")[0])}
      {quiz.type === "true_false" && quiz.params.answer && <CircleIcon size={16} strokeWidth={2.6} />}
      {quiz.type === "true_false" && !quiz.params.answer && <XIcon size={16} strokeWidth={2.6} />}
    </>
  );
};
