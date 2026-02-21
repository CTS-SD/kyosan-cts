import { eq, sql } from "drizzle-orm";
import type { Metadata } from "next";
import { getConfig } from "@/features/config/actions";
import { getQuizzes } from "@/features/quiz";
import {
  QuizSessionMain,
  QuizSessionMainBoundary,
  QuizSessionProvider,
  QuizSessionResultBoundary,
} from "@/features/quiz/components/quiz-session";
import { QuizTable } from "@/lib/db/schema";
import { QuizPlayView } from "./_components/quiz-play-view";
import { QuizResultsView } from "./_components/quiz-results-view";
import { QuizSessionHeader } from "./_components/quiz-session-header";

export const metadata: Metadata = {
  title: "ぷらっとテスト | 京産キャンスタ",
};

const Page = async () => {
  const config = await getConfig();

  const { quizzes } = await getQuizzes({
    limit: config.purattoTestQuestionCount,
    offset: 0,
    orderBy: sql`random()`,
    where: eq(QuizTable.isPublished, true),
  });

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
