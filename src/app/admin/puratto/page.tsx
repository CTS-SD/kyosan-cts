import { QuizList } from "@/components/admin/quiz/quiz-list";
import { QuizListSkeleton } from "@/components/admin/quiz/quiz-list-skeleton";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const Page = async () => {
  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="flex gap-2">
        <Button asChild className="ml-auto">
          <Link href="/admin/puratto/q/new">
            新規作成
            <PlusIcon />
          </Link>
        </Button>
      </div>
      <div className="mt-4">
        <Suspense fallback={<QuizListSkeleton />}>
          <QuizList />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
