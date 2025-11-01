"use client";

import { Button } from "@/components/ui/button";
import { getQuizzes } from "@/lib/quiz/actions";
import { useInfiniteQuery } from "@tanstack/react-query";
import { QuizItem } from "./quiz-item";
import { QuizListFallback } from "./quiz-list-fallback";

const PAGE_SIZE = 24;

export const QuizList = () => {
  const q = useInfiniteQuery({
    queryKey: ["quizzes"],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) =>
      getQuizzes({
        limit: PAGE_SIZE,
        offset: pageParam,
        orderBy: "id_desc",
      }),
    getNextPageParam: (last, pages) =>
      last.length === PAGE_SIZE ? pages.flat().length : undefined,
    staleTime: 1000 * 60 * 5,
  });

  if (q.isLoading && !q.data) return <QuizListFallback />;
  if (q.isError) return <div>Failed</div>;

  const quizzes = q.data!.pages.flat();

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <QuizItem key={quiz.id} quiz={quiz} />
        ))}
      </div>
      {q.hasNextPage ? (
        <div className="mt-4">
          <Button
            className="w-full"
            variant="outline"
            onClick={() => q.fetchNextPage()}
            disabled={q.isFetchingNextPage}
          >
            {q.isFetchingNextPage ? "読み込み中..." : "さらに表示"}
          </Button>
        </div>
      ) : null}
    </div>
  );
};
