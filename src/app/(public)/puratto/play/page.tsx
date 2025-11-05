import { QuizTable } from "@/lib/db/schema";
import { getQuizzes } from "@/lib/quiz/actions";
import { eq, sql } from "drizzle-orm";
import { ClientView } from "./client-view";

export const revalidate = 0;

const Page = async () => {
  const { quizzes } = await getQuizzes({
    limit: 5,
    offset: 0,
    orderBy: sql`random()`,
    where: eq(QuizTable.isPublished, true),
  });
  return <ClientView quizzes={quizzes} />;
};

export default Page;
