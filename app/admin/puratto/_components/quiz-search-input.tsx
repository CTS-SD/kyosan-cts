"use client";

import { SearchIcon, XIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { useQuizFilters } from "./use-quiz-filters";

export const QuizSearchInput = ({ className }: { className?: string }) => {
  const { q, setQ } = useQuizFilters();

  return (
    <InputGroup className={cn("bg-background", className)}>
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="問題文・解説・解答で検索"
      />
      {q ? (
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs" aria-label="検索をクリア" onClick={() => setQ("")}>
            <XIcon />
          </InputGroupButton>
        </InputGroupAddon>
      ) : null}
    </InputGroup>
  );
};
