import { Quiz } from "@/db/schema";
import { getQuizIcon } from "@/utils/utils";

type Props = {
  quiz: Quiz;
  isEdit?: boolean;
  onClick: () => void;
};

const QuizListItem = ({ quiz, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className="p-4 border rounded-lg  bg-neutral-50 cursor-pointer"
    >
      <div className="flex gap-3">
        <div className="rounded-md bg-black shrink-0 text-white size-8 grid place-content-center">
          {getQuizIcon(quiz.type)}
        </div>
        <div className="font-semibold pt-1 truncate">{quiz.question}</div>
      </div>
      <div className="text-sm mt-4">{quiz.answer}</div>
    </div>
  );
};

export default QuizListItem;
