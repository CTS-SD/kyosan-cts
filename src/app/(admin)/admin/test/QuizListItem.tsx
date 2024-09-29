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

type Props = {
  quiz: Quiz;
  isEdit?: boolean;
  onClick: () => void;
};

const QuizListItem = ({ quiz, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "p-4 border rounded-lg min-w-0 bg-white cursor-pointer",
        !quiz.isPublic && "border-dashed"
      )}
    >
      <div className="flex gap-3 w-full">
        <div className="rounded-md bg-black shrink-0 text-white size-8 grid place-content-center">
          {getQuizIcon(quiz.type)}
        </div>
        <div className="font-semibold pt-1 truncate">{quiz.question}</div>
      </div>
      <div className="flex items-center mt-4">
        <div className="text-sm flex items-center">
          <div className="text-neutral-500 shrink-0">解答：</div>
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
    </div>
  );
};

export default QuizListItem;
