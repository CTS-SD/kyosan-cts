import { eq, sql } from "drizzle-orm";
import {
  QuizSessionMain,
  QuizSessionMainBoundary,
  QuizSessionProvider,
  QuizSessionResultBoundary,
} from "@/components/quiz-play/quiz-session";
import { getUser } from "@/lib/auth/actions";
import { getConfig } from "@/lib/config/actions";
import { QuizTable } from "@/lib/db/schema";
import { getQuizzes } from "@/lib/quiz";
import { QuizPlayView } from "./quiz-play-view";
import { QuizResultsView } from "./quiz-results-view";
import { QuizSessionHeader } from "./quiz-session-header";

const Page = async () => {
  const config = await getConfig();

  const { quizzes } = await getQuizzes({
    limit: config.purattoTestQuestionCount,
    offset: 0,
    orderBy: sql`random()`,
    where: eq(QuizTable.isPublished, true),
  });

  const _user = await getUser();

  return (
    <QuizSessionProvider quizzes={quizzes}>
      <QuizSessionMainBoundary>
        <QuizSessionMain className="relative h-dvh overflow-clip">
          <QuizSessionHeader />
          <QuizPlayView />
        </QuizSessionMain>
      </QuizSessionMainBoundary>
      <QuizSessionResultBoundary>
        <QuizResultsView />
      </QuizSessionResultBoundary>
    </QuizSessionProvider>
  );
};

export default Page;
