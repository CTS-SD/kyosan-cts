import { useContext } from "react";
import { QuizFormContext } from "./QuizFormContext";
import { CircleIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/utils";
import { Quiz } from "@/db/schema";

type Props = {
  quiz: Quiz;
};

const btnStyle =
  "aspect-square rounded-2xl grow shrink-0 active:scale-95 transition-transform grid place-content-center border-2 text-neutral-300 bg-neutral-100";

const QuizFormOX = ({ quiz }: Props) => {
  const { value, setValue, isShowResult, showResult, isPreview } =
    useContext(QuizFormContext);

  const handleSubmit = () => {
    if (value == null) return;
    showResult(value === quiz.answer, value);
  };

  return (
    <>
      <div className="flex gap-3">
        <button
          onClick={() => setValue("__false__")}
          className={cn(
            btnStyle,
            value === "__false__" &&
              "border-red-300 bg-red-100 text-red-500 animate-pop"
          )}
          disabled={isShowResult}
        >
          <XIcon className="size-16" />
        </button>
        <button
          onClick={() => setValue("__true__")}
          className={cn(
            btnStyle,
            value === "__true__" &&
              "border-green-300 bg-green-100 text-green-500 animate-pop"
          )}
          disabled={isShowResult}
        >
          <CircleIcon className="size-16" />
        </button>
      </div>
      {!isShowResult && !isPreview && (
        <Button
          variant="primary"
          size="xl"
          onClick={() => handleSubmit()}
          className="absolute bottom-4 right-4 left-4 w-auto"
          disabled={value === null}
        >
          決定
        </Button>
      )}
    </>
  );
};

export default QuizFormOX;
