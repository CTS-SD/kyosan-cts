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
      <div className="flex items-center gap-2">
        <QuizListStats />
        <QuizSearchInput className="w-auto grow" />
        <QuizFilter />
        <Button className="shrink-0 max-sm:hidden" asChild>
          <Link href="/admin/puratto/q/new">
            新規作成
            <PlusIcon />
          </Link>
        </Button>
        <Button className="shrink-0 sm:hidden" asChild size="icon">
          <Link href="/admin/puratto/q/new">
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
