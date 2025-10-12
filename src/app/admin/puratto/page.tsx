import { QuizItem } from "@/components/admin/quiz/quiz-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getQuizzes } from "@/lib/quiz-actions";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

const Page = async () => {
  const quizzes = await getQuizzes({
    limit: 10,
    orderBy: "created_at_desc",
  });

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="flex gap-2">
        <Input placeholder="問題を検索" disabled />
        <Button asChild>
          <Link href="/admin/puratto/q/new">
            新規作成
            <PlusIcon />
          </Link>
        </Button>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => {
          return <QuizItem key={quiz.id} quiz={quiz} />;
        })}
      </div>
    </div>
  );
};

export default Page;
