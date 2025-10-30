import { QuizResult } from "@/lib/quiz-form";
import { QuizData } from "@/lib/quiz/data";
import Link from "next/link";
import { Button } from "../ui/button";
import { QuizResultItem } from "./quiz-result-item";
import { PlayfulButton } from "../ui/playful-button";

type Props = {
  quizzes: QuizData[];
  results: QuizResult[];
};

export const QuizResultsView = ({ quizzes, results }: Props) => {
  const correctCount = results.filter((r) => r.isCorrect).length;

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="flex justify-center py-16">
        <div className="text-3xl font-bold">{correctCount}問正解</div>
      </div>
      <div className="space-y-6">
        {results.map((result, i) => (
          <QuizResultItem
            key={i}
            index={i + 1}
            result={result}
            quiz={quizzes.find((q) => q.id === result.quizId)!}
          />
        ))}
      </div>
      <div className="bg-background sticky bottom-0 mt-6 py-4">
        <PlayfulButton
          render={<Link href="/puratto">OK</Link>}
          className="w-full"
        />
      </div>
    </div>
  );
};
