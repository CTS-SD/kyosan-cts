"use client";

import { Button } from "@/components/ui/button";
import { getQuizzes } from "@/lib/quiz/actions";
import { useQuizzesStore } from "@/stores/use-quizzes-store";
import { useEffect, useMemo, useState, useTransition } from "react";
import { QuizItem } from "./quiz-item";

const INIT_SIZE = 12;
const PAGE_SIZE = 48;

export const QuizListClient = () => {
  const { quizzes, setQuizzes } = useQuizzesStore();

  const [hasMore, setHasMore] = useState(true);
  const [isPending, startTransition] = useTransition();

  const gridItems = useMemo(
    () =>
      quizzes.map((quiz) => {
        return <QuizItem key={quiz.id} quiz={quiz} />;
      }),
    [quizzes],
  );

  const handleLoadQuizzes = (limit: number) => {
    if (isPending || !hasMore) return;

    startTransition(async () => {
      const newQuizzes = await getQuizzes({
        limit,
        offset: quizzes.length,
        orderBy: "id_desc",
      });
      setQuizzes([...quizzes, ...newQuizzes]);
      if (newQuizzes.length < limit) {
        setHasMore(false);
      }
    });
  };

  useEffect(() => {
    if (quizzes.length === 0) {
      handleLoadQuizzes(INIT_SIZE);
    }
  }, []);

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
            onClick={() => handleLoadQuizzes(PAGE_SIZE)}
            disabled={isPending}
          >
            {isPending ? "読み込み中..." : "さらに表示"}
          </Button>
        </div>
      ) : null}
    </div>
  );
};
