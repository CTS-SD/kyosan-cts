import { LockIcon } from "lucide-react";
import Link from "next/link";
import { getQuizPrompt, type Quiz } from "@/features/quiz";
import { Markdown } from "@/features/quiz/components/markdown";
import { QuizAnswerRenderer } from "@/features/quiz/components/quiz-answer-renderer";

type Props = {
  quiz: Quiz;
};

export const QuizItem = ({ quiz }: Props) => {
  return (
    <Link
      href={`/admin/puratto/q/${quiz.id}`}
      className="group/quiz-item relative overflow-clip rounded-3xl border bg-background shadow-xs"
      data-testid="quiz-item"
    >
      <div className="mask-b-from-80% h-[5.5lh] space-y-1.5 overflow-clip px-4 py-3">
        <div className="text-muted-foreground text-xs">{getQuizPrompt(quiz)}</div>
        <Markdown>{quiz.question}</Markdown>
      </div>
      <div className="p-1.5">
        <div className="flex items-center gap-3 rounded-2xl bg-surface px-3">
          <div className="mr-auto flex h-10 items-center gap-2 truncate">
            <div className="truncate font-semibold text-sky-600 text-sm">
              <QuizAnswerRenderer quiz={quiz} />
            </div>
          </div>
          <div className="h-6 w-0.5 rounded-full bg-primary/6"></div>
          {!quiz.isPublished && <LockIcon className="size-3.5 text-muted-foreground" strokeWidth={2.6} />}
          <div className="font-medium text-muted-foreground text-xs">No.{quiz.id}</div>
        </div>
      </div>
    </Link>
  );
};
