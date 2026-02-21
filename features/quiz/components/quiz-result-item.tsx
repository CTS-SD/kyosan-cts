import { CircleIcon, XIcon } from "lucide-react";
import { getQuizPrompt, type Quiz, type QuizResult } from "@/features/quiz";
import { Markdown } from "./markdown";
import { QuizAnswerRenderer } from "./quiz-answer-renderer";

export const QuizResultItem = ({ result, quiz }: { result: QuizResult; quiz?: Quiz }) => {
  if (!quiz) return null;

  return (
    <div className="rounded-3xl border shadow-xs">
      <div className="p-1.5">
        <div className="space-y-3 p-3.5 pt-2.5">
          <div className="flex items-center">
            <div className="font-semibold text-lg">{getQuizPrompt(quiz)}</div>
            <div className="ml-auto flex items-center gap-1 pr-1 font-bold text-muted-foreground">
              <span className="sr-only">あなたの回答は</span>
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
        <div className="rounded-2xl bg-surface px-4 py-3">
          <div className="flex items-center gap-1">
            <span className="text-nowrap">正解：</span>
            <div className="font-bold text-sky-600">
              <QuizAnswerRenderer quiz={quiz} />
            </div>
          </div>
          {quiz.explanation && (
            <div className="mt-3 text-sky-600">
              <Markdown>{quiz.explanation}</Markdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
