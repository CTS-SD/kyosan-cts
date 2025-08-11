import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/db";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

const Page = async () => {
  const quizzes = await db.query.QuizTable.findMany();

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="flex gap-2">
        <Input placeholder="問題を検索" />
        <Button asChild>
          <Link href="/admin/puratto/q/new">
            新規作成
            <PlusIcon />
          </Link>
        </Button>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {quizzes.map((quiz) => {
          return (
            <Link
              href={`/admin/puratto/q/${quiz.id}`}
              key={quiz.id}
              className="flex rounded-md border p-4"
            >
              <div>{quiz.question}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
