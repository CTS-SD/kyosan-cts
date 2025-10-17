import { getQuizzes, getQuizzesCount } from "@/lib/quiz/actions";
import { QuizListClient } from "./quiz-list-client";

export const QuizList = async () => {
  const count = await getQuizzesCount();
  const initialQuizzes = await getQuizzes({
    limit: 12,
    orderBy: "id_desc",
  });

  async function loadMore(offset: number) {
    "use server";

    return getQuizzes({
      limit: 48,
      orderBy: "id_desc",
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
