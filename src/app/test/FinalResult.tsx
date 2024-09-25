import { Button } from "@/components/ui/button";
import { cn } from "@/utils/utils";
import { CheckCircleIcon, SlashIcon, XCircleIcon } from "lucide-react";

type Props = {
  results: Result[];
  onRetry: () => void;
};

const FinalResult = ({ results, onRetry }: Props) => {
  const quizCount = results.length;
  const correctCount = results.filter((r) => r.correct).length;
  const passed = correctCount >= 3;

  return (
    <>
      <div className="pt-10 flex flex-col items-center">
        <div className="flex flex-col items-center gap-2">
          <div className="text-xl font-bold">最終結果</div>
          <div
            className={cn(
              "text-4xl font-bold",
              passed ? "text-green-500" : "text-red-500"
            )}
          >
            {passed ? "合格" : "不合格"}
          </div>
        </div>
        <div className="flex items-center mt-4 gap-4 font-bold">
          <div className="flex items-center gap-2">
            <CheckCircleIcon size={16} />
            <div>{correctCount}</div>
          </div>
          <div className="flex items-center gap-2">
            <XCircleIcon size={16} />
            <div>{quizCount - correctCount}</div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        {results.map((result, i) => (
          <div key={i} className="mb-6 pb-6 border-b last:border-b-0">
            <div className="flex items-start">
              {result.correct ? (
                <CheckCircleIcon className="text-green-500 mr-2 mt-1 flex-shrink-0" />
              ) : (
                <XCircleIcon className="text-red-500 mr-2 mt-1 flex-shrink-0" />
              )}
              <div>
                <p className="font-medium mb-2">{result.quiz.question}</p>
                <p className="text-sm text-muted-foreground mb-1">
                  あなたの回答: {result.userAnswer}
                </p>
                {!result.correct && (
                  <p className="text-sm text-green-600">
                    正解: {result.quiz.answer}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="fixed bottom-4 right-4 left-4">
        <Button className="w-full" onClick={onRetry}>
          再挑戦
        </Button>
      </div>
    </>
  );
};

export default FinalResult;
