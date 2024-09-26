import { Quiz } from "@/db/schema";
import { getAnswerElement, getQuizIcon } from "@/utils/utils";

type Props = {
  quiz: Quiz;
  isEdit?: boolean;
  onClick: () => void;
};

const QuizListItem = ({ quiz, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className="p-4 border rounded-lg min-w-0 bg-white cursor-pointer"
    >
      <div className="flex gap-3 w-full">
        <div className="rounded-md bg-black shrink-0 text-white size-8 grid place-content-center">
          {getQuizIcon(quiz.type)}
        </div>
        <div className="font-semibold pt-1 truncate">{quiz.question}</div>
      </div>
      <div className="text-sm mt-4 flex items-center">
        <div className="text-neutral-500 shrink-0">解答：</div>
        <div className="truncate">{getAnswerElement(quiz.answer)}</div>
      </div>
    </div>
  );
};

export default QuizListItem;
