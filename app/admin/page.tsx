import { Dashboard } from "@/components/admin/dashboard/dashboard";
import { getDailySessionTrend, getPerQuizAccuracy, getSessionSummary } from "@/lib/quiz";

const Page = async () => {
  const [summary, perQuiz, trend] = await Promise.all([
    getSessionSummary(),
    getPerQuizAccuracy(),
    getDailySessionTrend(),
  ]);

  return <Dashboard summary={summary} perQuiz={perQuiz} trend={trend} />;
};

export default Page;
