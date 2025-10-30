import { QuizResult } from "@/lib/quiz-form";
import { QuizData } from "@/lib/quiz/data";
import { CornerDownRightIcon } from "lucide-react";
import { Markdown } from "../markdown";
import { QuizAnswerRenderer } from "../quiz-answer-renderer";

type Props = {
  result: QuizResult;
  quiz: QuizData;
  index: number;
};

export const QuizResultItem = ({ result, quiz, index }: Props) => {
  return (
    <div className="">
      <div className="flex items-center gap-3">
        <div className="font-medium">第{index}問</div>
        <div className="font-bold">
          {result.isCorrect ? (
            <span className="text-green-500">正解!!</span>
          ) : (
            <span className="text-rose-500">不正解</span>
          )}
        </div>
      </div>
      <div className="bg-muted/50 -mx-6 mt-2 border p-1 sm:mx-0 sm:rounded-xl">
        <div className="bg-background rounded-lg border px-4 py-3">
          <Markdown className="">{quiz.question}</Markdown>
        </div>
        <div className="my-4 flex gap-3 px-4">
          <CornerDownRightIcon className="h-lh w-4 shrink-0" />
          <QuizAnswerRenderer quiz={quiz} className="font-bold text-blue-500" />
        </div>
        {quiz.explanation && (
          <div className="p-4 pt-0">
            <Markdown className="">{quiz.explanation}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
};
