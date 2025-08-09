import { getQuizById } from "@/lib/quiz-actions";
import { notFound } from "next/navigation";
import ClientPage from "./client-page";

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const quizId = parseInt(id, 10);

  if (isNaN(quizId)) notFound();

  const quiz = await getQuizById(quizId);

  if (!quiz) notFound();

  return <ClientPage quiz={quiz} />;
};

export default Page;
