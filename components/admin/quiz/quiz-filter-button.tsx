"use client";

import { FilterIcon, FilterXIcon, XCircleIcon, XIcon } from "lucide-react";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuizTags } from "@/hooks/query/use-quiz-tags";

export const QuizFilterButton = () => {
  const { data: tags } = useQuizTags();
  const [selectedTags, setSelectedTags] = useQueryState("tags", parseAsArrayOf(parseAsString).withDefault([]));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <FilterIcon />
          {selectedTags.length > 0 && (
            <Badge className="absolute -top-1 -right-1 size-4.5 p-0">{selectedTags.length}</Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {selectedTags.length > 0 && (
          <>
            <DropdownMenuItem variant="destructive" onClick={() => setSelectedTags([])}>
              すべて解除
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuGroup>
          <DropdownMenuLabel>タグで絞り込む</DropdownMenuLabel>
          {tags?.map((tag) => (
            <DropdownMenuCheckboxItem
              key={tag}
              textValue={tag}
              checked={selectedTags.includes(tag)}
              onCheckedChange={(checked) =>
                setSelectedTags(checked ? [...selectedTags, tag] : selectedTags.filter((t) => t !== tag))
              }
            >
              {tag}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
