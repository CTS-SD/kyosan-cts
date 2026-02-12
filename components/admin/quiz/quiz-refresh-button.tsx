"use client";

import { RefreshCwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuizList } from "@/hooks/query/use-quiz-list";

export const QuizRefreshButton = () => {
  const { refetch } = useQuizList();

  return (
    <Button variant="outline" className="shrink-0" size="icon" onClick={() => refetch()}>
      <RefreshCwIcon />
    </Button>
  );
};
