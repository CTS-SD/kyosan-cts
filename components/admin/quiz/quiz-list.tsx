"use client";

import { AlertCircleIcon } from "lucide-react";
import { useQuizList } from "@/hooks/query/use-quiz-list";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "../../ui/button";
import { QuizItem } from "./quiz-item";
import { QuizListSkeleton } from "./quiz-list-skeleton";

export const QuizList = ({ tags }: { tags?: string[] }) => {
  const { quizzes, isLoading, isFetchingNextPage, isError, hasNextPage, fetchNextPage } = useQuizList({ tags });

  if (isLoading) return <QuizListSkeleton />;
  if (isError)
    return (
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>問題の取得中にエラーが発生しました。</AlertTitle>
      </Alert>
    );

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
