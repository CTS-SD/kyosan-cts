"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { fetchQuizCounts } from "@/features/quizzes/api";
import { quizKeys } from "@/features/quizzes/query-keys";

export const QuizListStats = () => {
  const { data } = useQuery({
    queryKey: quizKeys.count(),
    queryFn: fetchQuizCounts,
    staleTime: 60 * 1000,
  });

  if (!data) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="rounded-full" variant="outline">
          全{data.total}問
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <div>
          公開中: {data.published}件 / 非公開: {data.unpublished}件
        </div>
      </PopoverContent>
    </Popover>
  );
};
