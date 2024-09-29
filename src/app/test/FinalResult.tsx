import { Button } from "@/components/ui/button";
import { cn, getAnswerElement } from "@/utils/utils";
import confetti from "canvas-confetti";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { Result } from "./page";

type Props = {
  results: Result[];
  onRetry: () => void;
  passingScore: number;
};

const FinalResult = ({ results, onRetry, passingScore }: Props) => {
  const quizCount = results.length;
  const correctCount = results.filter((r) => r.correct).length;
  const passed = correctCount >= passingScore;

  if (passed) {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  return (
    <>
      <div className="flex flex-col items-center pt-10">
        <div className="flex flex-col items-center gap-2">
          <div className="text-xl font-bold">ぷらっとテスト</div>
          <div
            className={cn(
              "text-4xl font-bold",
              passed ? "animate-pop text-green-500" : "text-red-500",
            )}
          >
            {passed ? "合格" : "不合格"}
          </div>
        </div>
        <div className="mt-4 flex items-center gap-4 font-bold">
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
      <div className="mt-10 text-xl font-bold">出題された問題</div>
      <div className="mt-6">
        {results.map((result, i) => (
          <div key={i} className="mb-6 border-b pb-6 last:border-b-0">
            <div className="flex items-start">
              {result.correct ? (
                <CheckCircleIcon className="mr-2 mt-1 flex-shrink-0 text-green-500" />
              ) : (
                <XCircleIcon className="mr-2 mt-1 flex-shrink-0 text-red-500" />
              )}
              <div>
                <p className="mb-2 font-medium">{result.quiz.question}</p>
                <p className="mb-1 flex items-center gap-1 text-sm text-muted-foreground">
                  あなたの回答: {getAnswerElement(result.userAnswer)}
                </p>
                {!result.correct && (
                  <p className="flex items-center gap-1 text-sm text-green-600">
                    正解: {getAnswerElement(result.quiz.answer)}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="primary"
        size="xl"
        className="sticky bottom-4 w-full"
        onClick={onRetry}
      >
        もう一度挑戦する
      </Button>
    </>
  );
};

export default FinalResult;
