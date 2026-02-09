import { eq, sql } from "drizzle-orm";
import { getConfig } from "@/lib/config/actions";
import { QuizTable } from "@/lib/db/schema";
import { getQuizzes } from "@/lib/quiz";
import { ClientView } from "./client-view";
import { getUser } from "@/lib/auth/actions";

const Page = async () => {
  const config = await getConfig();

  const { quizzes } = await getQuizzes({
    limit: config.purattoTestQuestionCount,
    offset: 0,
    orderBy: sql`random()`,
    where: eq(QuizTable.isPublished, true),
  });

  const user = await getUser();

  return <ClientView quizzes={quizzes} isAdmin={user?.role === "admin"} />;
};

export default Page;
