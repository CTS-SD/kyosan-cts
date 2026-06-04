import { CheckIcon, EllipsisIcon, LockIcon } from "lucide-react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getQuizPrompt } from "@/features/quizzes";
import { Markdown } from "@/features/quizzes/components/markdown";
import { QuizAnswerRenderer } from "@/features/quizzes/components/quiz-answer-renderer";
import { QuizMenuItems } from "@/features/quizzes/components/quiz-menu";
import type { Quiz } from "@/features/quizzes/types";

export const QuizItem = ({ quiz }: { quiz: Quiz }) => {
  return (
    <div className="relative">
      <Link
        href={`/admin/puratto/q/${quiz.id}`}
        className="group/quiz-item block rounded-3xl border bg-background shadow-xs"
        data-testid="quiz-item"
      >
        <div className="mask-b-from-80% h-[5.5lh] space-y-1.5 overflow-clip px-4 py-3">
          <div className="truncate font-semibold">{getQuizPrompt(quiz)}</div>
          <Markdown>{quiz.question}</Markdown>
        </div>
        <div className="p-1.5">
          <div className="flex items-center gap-2 px-3">
            <div className="mr-auto flex h-10 items-center gap-2 truncate">
              <div className="flex min-w-0 items-center gap-2 font-semibold text-sky-600 text-sm">
                <div className="text-xs opacity-40">
                  <CheckIcon className="size-4" />
                </div>
                <div className="truncate">
                  <QuizAnswerRenderer quiz={quiz} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className="absolute -top-2 right-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-0 rounded-full border bg-card ps-3 font-semibold text-lg text-muted-foreground"
            >
              {!quiz.isPublished && <LockIcon className="mr-2 size-3.5 text-muted-foreground/80" aria-label="非公開" />}
              <div className="text-muted-foreground/80 text-sm tracking-tight">
                <span className="text-xs">No.</span>
                {quiz.id}
              </div>
              <div className="grid size-8 place-content-center">
                <EllipsisIcon className="size-3.5 opacity-60" />
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <QuizMenuItems quizId={quiz.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
