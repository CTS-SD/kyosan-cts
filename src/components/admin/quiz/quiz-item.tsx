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
      className="bg-card rounded-lg border px-3.5 py-3"
    >
      <div className="h-[4lh] overflow-clip mask-b-from-60%">
        <RichTextEditor content={quiz.question} editable={false} />
      </div>
      <div className="mt-2 flex items-center gap-2">
        <div className="text-foreground/60 font-medium">#{quiz.id}</div>
        <QuizAnswerRenderer className="text-sm [&_svg]:size-3.5" quiz={quiz} />
        {!quiz.isPublished && (
          <div className="ml-auto">
            <Badge variant="secondary">
              <LockIcon className="size-3.5" />
              非公開
            </Badge>
          </div>
        )}
      </div>
    </Link>
  );
};
