import { cn } from "@/utils/utils";
import { SlashIcon } from "lucide-react";

type Props = {
  results: Result[];
  onRetry: () => void;
};

const FinalResult = ({ results, onRetry }: Props) => {
  const correctCount = results.filter((r) => r.correct).length;
  const passed = correctCount >= 3;

  return (
    <>
      <div className="p-4 bg-neutral-100 border rounded-2xl flex flex-col items-center">
        <div className="flex flex-col items-center gap-2">
          <div className="text-xl font-bold">最終結果</div>
          <div
            className={cn(
              "text-2xl font-bold",
              passed ? "text-green-600" : "text-red-600"
            )}
          >
            {passed ? "合格" : "不合格"}
          </div>
        </div>
        <div className="flex items-center gap-1 font-bold mt-4">
          <div className="text-lg text-green-600">{correctCount}問正解</div>
          <SlashIcon size={16} />
          <div>{results.length}問</div>
        </div>
      </div>
      <button onClick={onRetry}>Retry</button>
    </>
  );
};

export default FinalResult;
