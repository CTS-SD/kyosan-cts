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
        <div className="pt-1">{getQuizIcon(quiz.type)}</div>
        <div className="font-semibold">{quiz.question}</div>
      </div>
      <div className="text-sm mt-4">{quiz.answer}</div>
    </div>
  );
};

export default QuizListItem;
