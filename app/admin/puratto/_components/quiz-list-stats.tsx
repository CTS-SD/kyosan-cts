"use client";

import { LockIcon } from "lucide-react";
import { useQuizListStats } from "@/app/admin/puratto/_components/use-quiz-list-stats";
import { Badge } from "../../../../components/ui/badge";
import { Skeleton } from "../../../../components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../../../components/ui/tooltip";

export const QuizListStats = () => {
  const { isLoading, isError, data } = useQuizListStats();

  if (isLoading) return <Skeleton className="h-6 w-48" />;
  if (isError || !data) return <div>Error</div>;

  return (
    <div className="flex items-center gap-2">
      <Badge variant="outline" className="bg-card">
        計{data.totalCount}問
      </Badge>
      <Tooltip delayDuration={300}>
        <TooltipTrigger>
          <Badge variant="secondary" className="bg-accent">
            <LockIcon strokeWidth={2.4} />
            {data.privateCount}問
          </Badge>
        </TooltipTrigger>
        <TooltipContent side="bottom">非公開</TooltipContent>
      </Tooltip>
    </div>
  );
};
