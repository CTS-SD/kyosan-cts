import { CircleIcon, XIcon } from "lucide-react";
import type { QuizData } from "@/lib/quiz";

export const QuizAnswerRenderer = ({
  quiz,
  includeAlternatives = false,
}: {
  quiz: QuizData;
  includeAlternatives?: boolean;
}) => {
  return (
    <>
      {quiz.type === "select" && quiz.correctChoices.join(", ")}
      {quiz.type === "text" && (includeAlternatives ? quiz.answer.replace(/\n/g, ", ") : quiz.answer.split("\n")[0])}
      {quiz.type === "true_false" && quiz.answer && <CircleIcon size={16} strokeWidth={2.6} />}
      {quiz.type === "true_false" && !quiz.answer && <XIcon size={16} strokeWidth={2.6} />}
    </>
  );
};
