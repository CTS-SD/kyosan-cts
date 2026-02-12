import { CornerDownRightIcon, LockIcon } from "lucide-react";
import Link from "next/link";
import type { QuizData } from "@/lib/quiz";
import { Markdown } from "../../markdown";
import { QuizAnswerRenderer } from "../../quiz-answer-renderer";

type Props = {
  quiz: QuizData;
};

export const QuizItem = ({ quiz }: Props) => {
  return (
    <Link
      href={`/admin/puratto/q/${quiz.id}`}
      className="group/quiz-item relative overflow-clip rounded-3xl border bg-background shadow-xs"
      data-testid="quiz-item"
    >
      <div className="px-1 pt-1">
        <div className="mask-b-from-80% h-[4.5lh] overflow-clip px-3.5 py-3">
          <Markdown>{quiz.question}</Markdown>
        </div>
      </div>
      <div className="p-1.5">
        <div className="flex items-center gap-3 rounded-2xl bg-surface px-3">
          <div className="mr-auto flex h-10 items-center gap-2 truncate">
            <CornerDownRightIcon className="size-4 shrink-0 text-sky-500" strokeWidth={2.8} />
            <QuizAnswerRenderer className="truncate font-semibold text-sm [&_svg]:size-3.5" quiz={quiz} />
          </div>
          <div className="h-6 w-0.5 rounded-full bg-primary/6"></div>
          {!quiz.isPublished && <LockIcon className="size-3.5 text-muted-foreground" strokeWidth={2.6} />}
          <div className="font-medium text-muted-foreground text-xs">No.{quiz.id}</div>
        </div>
      </div>
    </Link>
  );
};
