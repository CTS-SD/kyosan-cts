"use client";

import { HashIcon, ListFilterIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuizTags } from "@/features/quizzes/hooks/use-quiz-tags";
import { type QuizStatus, useQuizFilters } from "./use-quiz-filters";

export const QuizFilter = () => {
  const { q, setQ, tags, setTags, untagged, setUntagged, status, setStatus } = useQuizFilters();
  const { data: allTags } = useQuizTags();

  const activeCount = (status ? 1 : 0) + (untagged ? 1 : 0) + tags.length;
  const hasActiveFilters = activeCount > 0 || q.trim().length > 0;

  const toggleUntagged = () => {
    setUntagged((prev) => !prev);
    setTags([]);
  };

  const toggleTag = (tag: string) => {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
    setUntagged(false);
  };

  const resetFilters = () => {
    setQ("");
    setTags([]);
    setUntagged(false);
    setStatus(null);
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
            <DropdownMenuCheckboxItem
              checked={untagged}
              onCheckedChange={toggleUntagged}
              onSelect={(e) => e.preventDefault()}
            >
              タグなし
            </DropdownMenuCheckboxItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                {tags.length > 0 ? (
                  <span className="font-medium">{tags.length}個のタグを選択中</span>
                ) : (
                  <span className="text-muted-foreground">タグを選択</span>
                )}
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {allTags.map((tag) => (
                  <DropdownMenuCheckboxItem
                    key={tag}
                    checked={tags.includes(tag)}
                    onCheckedChange={() => toggleTag(tag)}
                    onSelect={(e) => e.preventDefault()}
                  >
                    <HashIcon className="text-muted-foreground/60" />
                    {tag}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </>
        )}
        {hasActiveFilters && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onSelect={resetFilters}>
              絞り込みを解除
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
