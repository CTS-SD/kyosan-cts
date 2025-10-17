import { getQuizzes, getQuizzesCount } from "@/lib/quiz/actions";
import { QuizListClient } from "./quiz-list-client";

const GET_QUIZZES_ARGS = {
  limit: 48,
  orderBy: "id_desc" as const,
} as const;

export const QuizList = async () => {
  const count = await getQuizzesCount();
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
    <div>
      <div className="text-muted-foreground">計{count}問</div>
      <div className="mt-4">
        <QuizListClient
          {...{
            initialQuizzes,
            loadMore,
          }}
        />
      </div>
    </div>
  );
};
