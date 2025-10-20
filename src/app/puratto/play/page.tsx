import { getQuizzes } from "@/lib/quiz/actions";
import { ClientView } from "./client-view";

export const revalidate = 0;

const Page = async () => {
  const quizzes = await getQuizzes({
    limit: 5,
    orderBy: "random",
  });
  return <ClientView quizzes={quizzes} />;
};

export default Page;
