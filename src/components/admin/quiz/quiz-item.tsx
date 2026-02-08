import { CornerDownRightIcon, LockIcon } from "lucide-react";
import Link from "next/link";
import { Markdown } from "@/components/markdown";
import { QuizAnswerRenderer } from "@/components/quiz-answer-renderer";
import { Badge } from "@/components/ui/badge";
import type { QuizData } from "@/lib/quiz";
import { getQuizTypeLabel } from "@/lib/quiz";

type Props = {
  quiz: QuizData;
};

export const QuizItem = ({ quiz }: Props) => {
  return (
    <Link
      href={`/admin/puratto/q/${quiz.id}`}
      className="overflow-clip rounded-xl border bg-muted/50"
      data-testid="quiz-item"
    >
      <div className="px-1 pt-1">
        <div className="rounded-lg border bg-background">
          <div className="flex pt-2 pr-3 pl-2">
            <Badge variant="outline">{getQuizTypeLabel(quiz.type)}</Badge>
            <div className="ml-auto shrink-0 font-medium text-muted-foreground text-sm">#{quiz.id}</div>
          </div>
          <div className="mask-b-from-60% h-[4.5lh] overflow-clip px-3.5 py-3">
            <Markdown>{quiz.question}</Markdown>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="mx-3 flex h-9 items-center gap-2 truncate">
          <CornerDownRightIcon className="size-4 shrink-0 text-muted-foreground" />
          <QuizAnswerRenderer className="truncate font-semibold text-sm [&_svg]:size-3.5" quiz={quiz} />
        </div>
        {!quiz.isPublished && (
          <div className="mr-1 ml-auto">
            <Badge className="rounded-lg">
              <LockIcon className="size-4" />
              非公開
            </Badge>
          </div>
        )}
      </div>
    </Link>
  );
};
