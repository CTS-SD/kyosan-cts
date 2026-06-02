"use client";

import { ListFilterIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuizTags } from "@/features/quizzes/hooks/use-quiz-tags";
import { type QuizStatus, useQuizFilters } from "./use-quiz-filters";

export const QuizFilter = () => {
  const { tags, setTags, status, setStatus } = useQuizFilters();
  const { data: allTags } = useQuizTags();

  const activeCount = (status ? 1 : 0) + tags.length;

  const toggleTag = (tag: string) => {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="フィルター" className="relative shrink-0">
          <ListFilterIcon />
          {activeCount > 0 && (
            <Badge className="absolute -top-1.5 -right-1.5 size-4 justify-center rounded-full p-0 text-[10px]">
              {activeCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>ステータス</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={status ?? "all"}
          onValueChange={(v) => setStatus(v === "all" ? null : (v as QuizStatus))}
        >
          <DropdownMenuRadioItem value="all">すべて</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="published">公開中</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="draft">下書き</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        {allTags && allTags.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>タグ</DropdownMenuLabel>
            {allTags.map((tag) => (
              <DropdownMenuCheckboxItem
                key={tag}
                checked={tags.includes(tag)}
                onCheckedChange={() => toggleTag(tag)}
                onSelect={(e) => e.preventDefault()}
              >
                {tag}
              </DropdownMenuCheckboxItem>
            ))}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
