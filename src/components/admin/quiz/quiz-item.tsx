import { QuizAnswerRenderer } from "@/components/quiz-answer-renderer";
import { RichTextEditor } from "@/components/rich-text-editor";
import { Badge } from "@/components/ui/badge";
import { QuizData } from "@/lib/quiz-data";
import { LockIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  quiz: QuizData;
};

export const QuizItem = ({ quiz }: Props) => {
  return (
    <Link
      href={`/admin/puratto/q/${quiz.id}`}
      className="bg-card rounded-lg border overflow-clip"
    >
      <div className="h-[4.5lh] overflow-clip mask-b-from-60% px-3.5 py-3">
        <RichTextEditor content={quiz.question} editable={false} />
      </div>
      <div className="bg-accent flex items-center gap-2 border-t px-3.5 py-2 mt-2">
        <div className="text-foreground/60 shrink-0 font-medium">
          #{quiz.id}
        </div>
        <QuizAnswerRenderer
          className="truncate text-sm [&_svg]:size-3.5"
          quiz={quiz}
        />
        {!quiz.isPublished && (
          <div className="ml-auto">
            <Badge variant="outline">
              <LockIcon />
              非公開
            </Badge>
          </div>
        )}
      </div>
    </Link>
  );
};
