import { notFound } from "next/navigation";
import { getQuizById } from "../../../../../lib/quiz";
import { ClientView } from "./client-view";

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const quizId = parseInt(id, 10);

  if (Number.isNaN(quizId)) return notFound();

  const quiz = await getQuizById(quizId);

  if (!quiz) return notFound();

  return <ClientView quiz={quiz} />;
};

export default Page;
