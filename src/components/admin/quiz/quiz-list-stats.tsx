"use client";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useQuizListStats } from "@/hooks/query/use-quiz-list-stats";
import { EyeIcon, LockIcon } from "lucide-react";

export const QuizListStats = () => {
  const { isLoading, isError, data } = useQuizListStats();

  if (isLoading) return <Skeleton className="h-6 w-48" />;
  if (isError || !data) return <div>Error</div>;

  return (
    <div className="flex items-center gap-2">
      <Badge variant="outline">計{data.totalCount}問</Badge>
      <Tooltip>
        <TooltipTrigger>
          <Badge variant="secondary">
            <EyeIcon />
            {data.publicCount}問
          </Badge>
        </TooltipTrigger>
        <TooltipContent>公開中</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Badge variant="secondary">
            <LockIcon />
            {data.privateCount}問
          </Badge>
        </TooltipTrigger>
        <TooltipContent>非公開</TooltipContent>
      </Tooltip>
    </div>
  );
};
