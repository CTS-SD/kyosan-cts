"use client";

import { useDebounce } from "@uidotdev/usehooks";
import { Button } from "@/components/ui/button";
import { useQuizzes } from "@/features/quizzes/hooks/use-quizzes";
import { QuizItem } from "./quiz-item";
import { useQuizFilters } from "./use-quiz-filters";

export const QuizListClient = () => {
  const { q, tags, status } = useQuizFilters();
  const debouncedQ = useDebounce(q, 300);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useQuizzes({
    search: debouncedQ,
    tags,
    status: status ?? undefined,
  });

  const quizzes = data?.pages.flatMap((page) => page.items) ?? [];
  const isFiltering = debouncedQ.trim().length > 0 || tags.length > 0 || status !== null;

  return (
    <div>
      {quizzes.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground text-sm">
          {isFiltering ? "該当するクイズがありません" : "クイズがありません"}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => (
            <QuizItem key={quiz.id} quiz={quiz} />
          ))}
        </div>
      )}

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
