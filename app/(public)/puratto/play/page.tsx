import type { Metadata } from "next";
import {
  QuizSessionMain,
  QuizSessionMainBoundary,
  QuizSessionProvider,
  QuizSessionResultBoundary,
} from "@/features/quizzes/components/quiz-session";
import { getConfig } from "@/server/services/config";
import { getRandomPublishedQuizzes } from "@/server/services/quizzes";
import { QuizPlayView } from "./_components/quiz-play-view";
import { QuizResultsView } from "./_components/quiz-results-view";
import { QuizSessionHeader } from "./_components/quiz-session-header";

export const metadata: Metadata = {
  title: "ぷらっとテスト | 京産キャンスタ",
};

const Page = async () => {
  const config = await getConfig();

  const quizzes = await getRandomPublishedQuizzes(config.purattoTestQuestionCount);

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
