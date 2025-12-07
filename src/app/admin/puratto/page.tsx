import { QuizList } from "@/components/admin/quiz/quiz-list";
import { QuizListStats } from "@/components/admin/quiz/quiz-list-stats";
import QuizListWrapper from "@/components/admin/quiz/quiz-list-wrapper";
import { QuizSearchInput } from "@/components/admin/quiz/quiz-search-input";
import { QuizSearchResults } from "@/components/admin/quiz/quiz-search-results";
import { Button } from "@/components/ui/button";
import { requireRole } from "@/lib/auth/actions";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

const Page = async () => {
  await requireRole(["admin"]);

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="flex gap-2">
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
