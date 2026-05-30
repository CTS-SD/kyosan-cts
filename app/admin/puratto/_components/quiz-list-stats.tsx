"use client";

import { useQuery } from "@tanstack/react-query";
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
    <div className="flex items-center gap-4 text-muted-foreground text-sm">
      <span>
        全<span className="font-semibold text-foreground">{data.total}</span>問
      </span>
      <span>公開 {data.published}</span>
      <span>非公開 {data.unpublished}</span>
    </div>
  );
};
