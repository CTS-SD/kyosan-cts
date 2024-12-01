import { Quiz } from "@/db/schema";
import { getAnswerElement, getQuizIcon } from "@/utils/utils";
import { cn } from "@/lib/utils";
import { LockIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

type Props = {
  quiz: Quiz;
};

const QuizListItem = ({ quiz }: Props) => {
  return (
    <Link
      href={`/admin/test/q/${quiz.id}`}
      className={cn(
        "block min-w-0 cursor-pointer rounded-lg border bg-white p-4",
        !quiz.isPublic && "border-dashed",
      )}
    >
      <div className="flex w-full gap-3">
        <div className="grid size-8 shrink-0 place-content-center rounded-md bg-black text-white">
          {getQuizIcon(quiz.type)}
        </div>
        <div className="truncate pt-1 font-semibold">{quiz.question}</div>
      </div>
      <div className="mt-4 flex items-center">
        <div className="flex min-w-0 items-center text-sm">
          <div className="shrink-0 text-neutral-500">解答：</div>
          <div className="truncate">{getAnswerElement(quiz.answer)}</div>
        </div>
        {!quiz.isPublic && (
          <div className="ml-auto shrink-0">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <LockIcon size={16} />
                </TooltipTrigger>
                <TooltipContent>非公開</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>
    </Link>
  );
};

export default QuizListItem;
