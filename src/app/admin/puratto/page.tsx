import { QuizList } from "@/components/admin/quiz/quiz-list";
import { QuizListFallback } from "@/components/admin/quiz/quiz-list-fallback";
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
        <Suspense fallback={<QuizListFallback />}>
          <QuizList />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
