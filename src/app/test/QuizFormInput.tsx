import { useContext } from "react";
import { QuizFormContext } from "./QuizFormContext";
import { cn } from "@/utils/utils";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/db/schema";

type Props = {
  quiz: Quiz;
};

const QuizFormInput = ({ quiz }: Props) => {
  const { value, setValue, isShowResult, showResult } =
    useContext(QuizFormContext);

  const cleanValue = typeof value == "string" ? value.trim() : "";
  const isCorrect = cleanValue === quiz.answer;

  const handleAnswer = () => {
    showResult(isCorrect, cleanValue);
  };

  return (
    <div className="">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAnswer();
        }}
      >
        <input
          value={typeof value == "string" ? value : ""}
          onChange={(e) => setValue(e.currentTarget.value)}
          className={cn(
            "py-4 px-6 font-bold bg-neutral-100 rounded-full w-full border-2",
            isShowResult &&
              (isCorrect
                ? "bg-green-100 border-green-300 text-green-500 animate-pop"
                : "bg-red-100 border-red-300 text-red-500 animate-shake")
          )}
          disabled={isShowResult}
          placeholder="回答を入力"
        />
        {!isShowResult && (
          <Button
            type="submit"
            className="absolute bottom-4 right-4 left-4"
            disabled={isShowResult || !value}
          >
            決定
          </Button>
        )}
      </form>
    </div>
  );
};

export default QuizFormInput;
