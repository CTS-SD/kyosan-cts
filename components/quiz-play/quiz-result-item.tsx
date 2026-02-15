import { CircleIcon, XIcon } from "lucide-react";
import { getQuizPrompt, type QuizData, type QuizResult } from "@/lib/quiz";
import { Markdown } from "../markdown";
import { QuizAnswerRenderer } from "../quiz-answer-renderer";

type Props = {
  result: QuizResult;
  quiz: QuizData;
  index: number;
};

export const QuizResultItem = ({ result, quiz, index }: Props) => {
  return (
    <div className="rounded-3xl border shadow-xs">
      <div className="p-4">
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="font-semibold text-lg">{getQuizPrompt(quiz)}</div>
            <div className="ml-auto flex items-center gap-1 pr-1 font-bold text-muted-foreground">
              {result.isCorrect ? (
                <span className="contents text-green-500">
                  <CircleIcon strokeWidth={3} className="size-5" />
                  正解
                </span>
              ) : (
                <>
                  <XIcon strokeWidth={3} className="size-5" />
                  不正解
                </>
              )}
            </div>
          </div>
          <Markdown className="">{quiz.question}</Markdown>
        </div>
        <div className="flex items-center gap-1 pt-4">
          <span className="text-muted-foreground">答え：</span>
          <div className="font-bold">
            <QuizAnswerRenderer quiz={quiz} />
          </div>
        </div>
      </div>
    </div>
  );
};
