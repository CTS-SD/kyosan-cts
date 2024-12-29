import { db } from "@/db/db";
import { quizzes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { validate as isUuid } from "uuid";
import QuizForm from "../../QuizForm";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";

type Props = {
  params: {
    id: string;
  };
};

const Page = async ({ params: { id } }: Props) => {
  if (!isUuid(id)) {
    notFound();
  }

  const quiz = (await db.select().from(quizzes).where(eq(quizzes.id, id)))[0];

  if (!quiz) {
    notFound();
  }

  return (
    <div className="pb-6">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex items-center py-6">
          <Link
            href="/admin/test"
            className="inline-flex items-center gap-1 font-semibold"
          >
            <ChevronLeftIcon size={20} />
            問題一覧
          </Link>
        </div>
        <QuizForm quiz={quiz} isEdit />
      </div>
    </div>
  );
};

export default Page;
