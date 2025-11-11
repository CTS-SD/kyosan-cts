"use client";

import { QuizList } from "@/components/admin/quiz/quiz-list";
import { QuizListStats } from "@/components/admin/quiz/quiz-list-stats";
import { QuizSearchResults } from "@/components/admin/quiz/quiz-search-results";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { PlusIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useQueryState } from "nuqs";

const Page = () => {
  const [query, setQuery] = useQueryState("q");
  const computedQuery = query?.trim() ?? "";

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="flex gap-2">
        <InputGroup>
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput
            type="search"
            className="grow"
            placeholder="問題を検索"
            value={query ?? ""}
            onChange={(e) => setQuery(e.target.value)}
          />
        </InputGroup>
        <Button className="shrink-0" asChild>
          <Link href="/admin/puratto/q/new">
            新規作成
            <PlusIcon />
          </Link>
        </Button>
      </div>
      <div className="mt-4">
        <QuizListStats />
      </div>
      <div className="mt-4">{computedQuery.length > 0 ? <QuizSearchResults /> : <QuizList />}</div>
    </div>
  );
};

export default Page;
