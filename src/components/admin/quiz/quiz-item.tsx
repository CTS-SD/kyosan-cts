import { QuizAnswerRenderer } from "@/components/quiz-answer-renderer";
import { RichTextRenderer } from "@/components/rich-text-renderer";
import { Badge } from "@/components/ui/badge";
import { QuizData } from "@/lib/quiz/data";
import { getQuizTypeLabel, quizTypes } from "@/lib/quiz/types";
import { CornerDownRightIcon, LockIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  quiz: QuizData;
};

export const QuizItem = ({ quiz }: Props) => {
  return (
    <Link
      href={`/admin/puratto/q/${quiz.id}`}
      className="bg-card overflow-clip rounded-lg border"
    >
      <div className="flex pt-2 pr-3 pl-2">
        <Badge variant="outline">{getQuizTypeLabel(quiz.type)}</Badge>
        <div className="text-muted-foreground ml-auto shrink-0 text-sm font-medium">
          #{quiz.id}
        </div>
      </div>
      <div className="h-[4.5lh] overflow-clip mask-b-from-60% px-3.5 py-3">
        <RichTextRenderer content={quiz.question} editable={false} />
      </div>
      <div className="bg-accent mt-2 flex items-center gap-2 border-t px-3.5 py-2">
        <CornerDownRightIcon className="size-4 text-muted-foreground" />
        <QuizAnswerRenderer
          className="truncate text-sm [&_svg]:size-3.5"
          quiz={quiz}
        />
        {!quiz.isPublished && (
          <div className="ml-auto">
            <Badge>
              <LockIcon />
              非公開
            </Badge>
          </div>
        )}
      </div>
    </Link>
  );
};
