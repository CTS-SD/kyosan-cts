import { QuizList } from "@/components/admin/quiz/quiz-list";
import { QuizListStats } from "@/components/admin/quiz/quiz-list-stats";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

const Page = async () => {
  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="flex gap-2">
        <Button className="ml-auto" asChild>
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
        <QuizList />
      </div>
    </div>
  );
};

export default Page;
