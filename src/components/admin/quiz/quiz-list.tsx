"use client";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { getQuizzes } from "@/lib/quiz/actions";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AlertCircleIcon } from "lucide-react";
import { QuizItem } from "./quiz-item";
import { QuizListSkeleton } from "./quiz-list-skeleton";

const PAGE_SIZE = 24;

export const QuizList = () => {
  const q = useInfiniteQuery({
    queryKey: ["quizzes"],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) =>
      getQuizzes({
        limit: PAGE_SIZE,
        offset: pageParam,
      }),
    getNextPageParam: (last) => (last.hasMore ? last.nextCursor : undefined),
    staleTime: 1000 * 60 * 5,
  });

  if (q.isLoading && !q.data) return <QuizListSkeleton />;
  if (q.isError)
    return (
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>問題の取得中にエラーが発生しました。</AlertTitle>
      </Alert>
    );

  const quizzes = q.data!.pages.flatMap((p) => p.quizzes);

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
