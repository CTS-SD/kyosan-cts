"use client";

import { useMemo, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { QuizData } from "@/lib/quiz/data";
import { QuizItem } from "./quiz-item";

type Props = {
  initialQuizzes: QuizData[];
  loadMore: (offset: number) => Promise<QuizData[]>;
};

const PAGE_SIZE = 24;

export const QuizListClient = ({ initialQuizzes, loadMore }: Props) => {
  const [quizzes, setQuizzes] = useState(initialQuizzes);
  const [hasMore, setHasMore] = useState(initialQuizzes.length >= PAGE_SIZE);
  const [isPending, startTransition] = useTransition();

  const gridItems = useMemo(
    () =>
      quizzes.map((quiz) => {
        return <QuizItem key={quiz.id} quiz={quiz} />;
      }),
    [quizzes],
  );

  const handleLoadMore = () => {
    if (isPending || !hasMore) return;

    startTransition(() => {
      loadMore(quizzes.length)
        .then((next) => {
          if (next.length === 0) {
            setHasMore(false);
            return;
          }

          setQuizzes((prev) => {
            return [...prev, ...next];
          });

          if (next.length < PAGE_SIZE) {
            setHasMore(false);
          }
        })
        .catch((error) => {
          console.error("Failed to load more quizzes", error);
        });
    });
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gridItems}
      </div>
      {hasMore ? (
        <div className="mt-4">
          <Button
            className="w-full"
            variant="outline"
            onClick={handleLoadMore}
            disabled={isPending}
          >
            {isPending ? "読み込み中..." : "さらに表示"}
          </Button>
        </div>
      ) : null}
    </div>
  );
};
