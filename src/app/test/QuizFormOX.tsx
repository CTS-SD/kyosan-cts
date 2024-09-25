import { useContext } from "react";
import { QuizFormContext } from "./QuizFormContext";
import { CircleIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/utils";

type Props = {
  quiz: OXQuiz;
};

const btnStyle =
  "aspect-square rounded-2xl grow shrink-0 active:scale-95 transition-transform grid place-content-center border-2 text-neutral-300 bg-neutral-100";

const QuizFormOX = ({ quiz }: Props) => {
  const { value, setValue, isShowResult, showResult } =
    useContext(QuizFormContext);

  const handleSubmit = () => {
    if (value == null) return;
    showResult(value === quiz.answer, value);
  };

  return (
    <>
      <div className="flex gap-3">
        <button
          onClick={() => setValue(false)}
          className={cn(
            btnStyle,
            value === false && "border-red-300 bg-red-100 text-red-500 animate-pop"
          )}
          disabled={isShowResult}
        >
          <XIcon className="size-16" />
        </button>
        <button
          onClick={() => setValue(true)}
          className={cn(
            btnStyle,
            value === true && "border-green-300 bg-green-100 text-green-500 animate-pop"
          )}
          disabled={isShowResult}
        >
          <CircleIcon className="size-16" />
        </button>
      </div>
      {!isShowResult && (
        <Button
          onClick={() => handleSubmit()}
          className="absolute bottom-4 right-4 left-4"
          disabled={value === null}
        >
          決定
        </Button>
      )}
    </>
  );
};

export default QuizFormOX;
