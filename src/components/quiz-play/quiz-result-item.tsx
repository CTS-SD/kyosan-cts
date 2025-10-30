import { QuizResult } from "@/lib/quiz-form";
import { QuizData } from "@/lib/quiz/data";
import { ArrowRightIcon } from "lucide-react";
import { Markdown } from "../markdown";
import { QuizAnswerRenderer } from "../quiz-answer-renderer";
import { Badge } from "../ui/badge";

type Props = {
  result: QuizResult;
  quiz: QuizData;
  index: number;
};

export const QuizResultItem = ({ result, quiz, index }: Props) => {
  return (
    <div className="">
      <div className="bg-background shadow-border space-y-3 rounded-xl border px-3 pt-3 pb-3 shadow-[0_2px]">
        <div className="flex gap-2">
          <Badge variant="secondary">第{index}問</Badge>
          <Badge variant="outline">
            {result.isCorrect ? (
              <span className="text-green-500">正解</span>
            ) : (
              <span className="text-rose-500">不正解</span>
            )}
          </Badge>
        </div>
        <Markdown className="">{quiz.question}</Markdown>
      </div>
      <div className="mt-4">
        <div className="flex gap-2">
          <ArrowRightIcon
            className="text-muted-foreground h-lh w-4"
            strokeWidth={2.8}
          />
          <QuizAnswerRenderer quiz={quiz} className="font-semibold" />
        </div>
      </div>
    </div>
  );
};
