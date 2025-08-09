import { getRandomQuizzes } from "@/lib/quiz-actions";
import QuizView from "./client-view";

const Page = async () => {
  const quizzes = await getRandomQuizzes(3);
  return <QuizView quizzes={quizzes} />;
};

export default Page;
