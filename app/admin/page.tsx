import type { Metadata } from "next";
import { Dashboard } from "@/app/admin/_components/dashboard";
import { getDailySessionTrend, getPerQuizAccuracy, getSessionSummary } from "@/features/quiz";

export const metadata: Metadata = {
  title: "結果の統計 - ぷらっとテスト | 京産キャンスタ 管理者",
};

const Page = async () => {
  const [summary, perQuiz, trend] = await Promise.all([
    getSessionSummary(),
    getPerQuizAccuracy(),
    getDailySessionTrend(),
  ]);

  return <Dashboard summary={summary} perQuiz={perQuiz} trend={trend} />;
};

export default Page;
