"use client";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getQuizListStats } from "@/lib/quiz/actions";
import { useQuery } from "@tanstack/react-query";
import { EyeIcon, LockIcon } from "lucide-react";

export const QuizListStats = () => {
  const q = useQuery({
    queryKey: ["quiz-list-stats"],
    queryFn: getQuizListStats,
    staleTime: 1000 * 60 * 5,
  });

  if (q.isLoading) return <Skeleton className="h-6 w-48" />
  if (q.isError || !q.data) return <div>Error</div>;

  return (
    <div className="flex items-center gap-2">
      <Badge variant="outline">計{q.data.totalCount}問</Badge>
      <Tooltip>
        <TooltipTrigger>
          <Badge variant="secondary">
            <EyeIcon />
            {q.data.publicCount}問
          </Badge>
        </TooltipTrigger>
        <TooltipContent>公開中</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Badge variant="secondary">
            <LockIcon />
            {q.data.privateCount}問
          </Badge>
        </TooltipTrigger>
        <TooltipContent>非公開</TooltipContent>
      </Tooltip>
    </div>
  );
};
