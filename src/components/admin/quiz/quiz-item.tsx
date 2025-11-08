import { Markdown } from "@/components/markdown";
import { QuizAnswerRenderer } from "@/components/quiz-answer-renderer";
import { Badge } from "@/components/ui/badge";
import { QuizData } from "@/lib/quiz/data";
import { getQuizTypeLabel } from "@/lib/quiz/types";
import { CornerDownRightIcon, LockIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  quiz: QuizData;
};

export const QuizItem = ({ quiz }: Props) => {
  return (
    <Link
      href={`/admin/puratto/q/${quiz.id}`}
      className="bg-muted/50 overflow-clip rounded-xl border"
      data-testid="quiz-item"
    >
      <div className="px-1 pt-1">
        <div className="bg-background rounded-lg border">
          <div className="flex pt-2 pr-3 pl-2">
            <Badge variant="outline">{getQuizTypeLabel(quiz.type)}</Badge>
            <div className="text-muted-foreground ml-auto shrink-0 text-sm font-medium">
              #{quiz.id}
            </div>
          </div>
          <div className="h-[4.5lh] overflow-clip mask-b-from-60% px-3.5 py-3">
            <Markdown>{quiz.question}</Markdown>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="mx-3 flex h-9 items-center gap-2 truncate">
          <CornerDownRightIcon className="text-muted-foreground size-4 shrink-0" />
          <QuizAnswerRenderer
            className="truncate text-sm font-semibold [&_svg]:size-3.5"
            quiz={quiz}
          />
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
