import { QuizResult } from "@/lib/quiz-form";
import { QuizData } from "@/lib/quiz/data";
import { CornerDownRightIcon, LightbulbIcon } from "lucide-react";
import { Markdown } from "./markdown";
import { QuizAnswerRenderer } from "./quiz-answer-renderer";

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
            <span className="text-green-600">正解</span>
          ) : (
            <span className="text-red-600">不正解</span>
          )}
        </div>
      </div>
      <div className="bg-muted/50 -mx-6 mt-2 border p-1 shadow-lg sm:mx-0 sm:rounded-xl">
        <div className="p-3">
          <Markdown className="">{quiz.question}</Markdown>
        </div>
        <div className="mb-3 flex gap-2 px-3">
          <CornerDownRightIcon className="size-4 h-[1lh] shrink-0" />
          <QuizAnswerRenderer quiz={quiz} className="font-bold text-blue-500" />
        </div>
        {quiz.explanation && (
          <div className="bg-background relative mt-3 rounded-lg border p-3">
            <div className="flex items-center gap-1 text-sm font-semibold">
              <LightbulbIcon className="size-3.5" />
              解説
            </div>
            <Markdown className="mt-2 opacity-80">{quiz.explanation}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
};
