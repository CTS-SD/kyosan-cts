import { useContext } from "react";
import { QuizFormContext } from "./QuizFormContext";
import { cn } from "@/utils/utils";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/db/schema";

type Props = {
  quiz: Quiz;
};

const QuizFormInput = ({ quiz }: Props) => {
  const { value, setValue, isShowResult, showResult, isPreview } =
    useContext(QuizFormContext);

  const cleanValue = typeof value == "string" ? value.trim() : "";
  const isCorrect = cleanValue === quiz.answer;

  const handleAnswer = () => {
    showResult(isCorrect, cleanValue);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleAnswer();
      }}
      className="contents"
    >
      <input
        value={typeof value == "string" ? value : ""}
        onChange={(e) => setValue(e.currentTarget.value)}
        className={cn(
          "w-full rounded-full border-2 bg-neutral-100 px-6 py-4 font-bold",
          isShowResult &&
            (isCorrect
              ? "animate-pop border-green-300 bg-green-100 text-green-500"
              : "animate-shake border-red-300 bg-red-100 text-red-500"),
        )}
        disabled={isShowResult}
        placeholder="回答を入力"
      />
      {!isShowResult && (
        <Button
          variant="primary"
          size="xl"
          type="submit"
          className="sticky mt-auto w-full"
          disabled={isShowResult || !value}
        >
          決定
        </Button>
      )}
    </form>
  );
};

export default QuizFormInput;
