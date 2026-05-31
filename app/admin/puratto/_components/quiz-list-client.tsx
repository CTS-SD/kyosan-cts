"use client";

import { useDebounce } from "@uidotdev/usehooks";
import { useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import { useQuizzes } from "@/features/quizzes/hooks/use-quizzes";
import { QuizItem } from "./quiz-item";

export const QuizListClient = () => {
  const [q] = useQueryState("q", { defaultValue: "", clearOnDefault: true });
  const debouncedQ = useDebounce(q, 300);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useQuizzes(debouncedQ);

  const quizzes = data?.pages.flatMap((page) => page.items) ?? [];
  const isSearching = debouncedQ.trim().length > 0;

  return (
    <div>
      {quizzes.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground text-sm">
          {isSearching ? "該当するクイズがありません" : "クイズがありません"}
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
