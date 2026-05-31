import { PlusIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { QuizFilter } from "./_components/quiz-filter";
import { QuizList } from "./_components/quiz-list";
import { QuizListStats } from "./_components/quiz-list-stats";
import { QuizSearchInput } from "./_components/quiz-search-input";

export const metadata: Metadata = {
  title: "クイズを管理 - ぷらっとテスト",
};

const Page = async () => {
  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="flex flex-wrap items-center gap-2">
        <QuizListStats />
        <QuizSearchInput className="min-w-48 flex-1" />
        <QuizFilter />
        <Button className="shrink-0" asChild>
          <Link href="/admin/puratto/q/new">
            新規作成
            <PlusIcon />
          </Link>
        </Button>
      </div>
      <div className="mt-4">
        <QuizList />
      </div>
    </div>
  );
};

export default Page;
