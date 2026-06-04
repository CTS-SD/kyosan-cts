"use client";

import { SearchIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { useQuizFilters } from "./use-quiz-filters";

export const QuizSearchInput = ({ className }: { className?: string }) => {
  const { q, setQ } = useQuizFilters();

  return (
    <InputGroup className={cn("bg-background", className)}>
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="問題を検索..." />
    </InputGroup>
  );
};
