import { PlusIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { QuizFilterButton } from "@/components/admin/quiz/quiz-filter-button";
import { QuizListStats } from "@/components/admin/quiz/quiz-list-stats";
import QuizListWrapper from "@/components/admin/quiz/quiz-list-wrapper";
import { QuizRefreshButton } from "@/components/admin/quiz/quiz-refresh-button";
import { QuizSearchInput } from "@/components/admin/quiz/quiz-search-input";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "クイズを管理 - ぷらっとテスト",
};

const Page = async () => {
  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="flex gap-2">
        <QuizRefreshButton />
        <QuizFilterButton />
        <QuizSearchInput />
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
      <div className="mt-4">
        <QuizListWrapper />
      </div>
    </div>
  );
};

export default Page;
