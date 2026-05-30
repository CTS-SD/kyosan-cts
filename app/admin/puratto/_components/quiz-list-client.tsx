"use client";

import { Button } from "@/components/ui/button";
import { useQuizzes } from "@/features/quizzes/hooks/use-quizzes";
import { QuizItem } from "./quiz-item";

export const QuizListClient = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useQuizzes();

  const quizzes = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <QuizItem key={quiz.id} quiz={quiz} />
        ))}
      </div>
      {hasNextPage ? (
        <div className="mt-4">
          <Button className="w-full" variant="outline" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? "読み込み中..." : "さらに表示"}
          </Button>
        </div>
      ) : null}
    </div>
  );
};
