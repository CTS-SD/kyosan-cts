import { getRandomQuizzes } from "@/lib/quiz-actions";
import { ClientView } from "./client-view";

export const revalidate = 0;

const Page = async () => {
  const quizzes = await getRandomQuizzes(3);
  return <ClientView quizzes={quizzes} />;
};

export default Page;
