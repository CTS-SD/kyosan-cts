import { getQuizzes } from "@/lib/quiz/actions";
import { QuizListClient } from "./quiz-list-client";

const GET_QUIZZES_ARGS = {
  limit: 24,
  orderBy: "id_desc" as const,
} as const;

export const QuizList = async () => {
  const initialQuizzes = await getQuizzes({
    ...GET_QUIZZES_ARGS,
  });

  async function loadMore(offset: number) {
    "use server";

    return getQuizzes({
      ...GET_QUIZZES_ARGS,
      offset,
    });
  }

  return (
    <QuizListClient
      {...{
        initialQuizzes,
        loadMore,
      }}
    />
  );
};
