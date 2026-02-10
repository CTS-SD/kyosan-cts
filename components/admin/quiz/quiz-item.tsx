import { CornerDownRightIcon, LockIcon } from "lucide-react";
import Link from "next/link";
import type { QuizData } from "../../../lib/quiz";
import { Markdown } from "../../markdown";
import { QuizAnswerRenderer } from "../../quiz-answer-renderer";

type Props = {
  quiz: QuizData;
};

export const QuizItem = ({ quiz }: Props) => {
  return (
    <Link
      href={`/admin/puratto/q/${quiz.id}`}
      className="relative overflow-clip rounded-3xl border bg-background shadow-xs"
      data-testid="quiz-item"
    >
      <div className="px-1 pt-1">
        <div className="mask-b-from-80% h-[4.5lh] overflow-clip px-3.5 py-3">
          <Markdown>{quiz.question}</Markdown>
        </div>
      </div>
      <div className="p-2">
        <div className="flex items-center gap-3 rounded-2xl bg-accent px-3">
          <div className="flex h-10 items-center gap-2 truncate">
            <CornerDownRightIcon className="size-4 shrink-0 text-sky-500" strokeWidth={2.8} />
            <QuizAnswerRenderer className="truncate font-semibold text-sm [&_svg]:size-3.5" quiz={quiz} />
          </div>
          <div className="ml-auto h-6 w-0.5 rounded-full bg-primary/6"></div>
          <div className="font-medium text-muted-foreground text-xs">No.{quiz.id}</div>
        </div>
      </div>
      {!quiz.isPublished && (
        <div className="absolute inset-1 grid place-content-center rounded-2xl border bg-black/10 transition-all duration-160 hover:scale-95 hover:opacity-0">
          <div className="flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-white backdrop-blur-md">
            <LockIcon className="size-4" />
            <span className="font-semibold text-sm">非公開</span>
          </div>
        </div>
      )}
    </Link>
  );
};
