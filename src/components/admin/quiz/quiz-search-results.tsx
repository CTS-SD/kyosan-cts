import { useQuizSearch } from "@/hooks/query/use-quiz-search";
import { useDebounce } from "@uidotdev/usehooks";
import { useQueryState } from "nuqs";
import { QuizItem } from "./quiz-item";
import { QuizListSkeleton } from "./quiz-list-skeleton";

export const QuizSearchResults = () => {
  const [query] = useQueryState("q");
  const q = useDebounce(query, 300);
  const { isPending, isFetching, isError, data } = useQuizSearch({
    keyword: q ?? "",
  });

  if (isPending) {
    return <QuizListSkeleton />;
  }

  if (!isFetching && (isError || data === undefined)) {
    return <div>Error</div>;
  }

  const quizzes = data?.quizzes ?? [];

  if (!isFetching && quizzes.length === 0) {
    return (
      <div className="text-muted-foreground transition-opacity starting:opacity-0">
        「{query}」の検索結果が見つかりませんでした。
      </div>
    );
  }

  return (
    <div
      className={
        "grid grid-cols-1 gap-4 transition-opacity duration-300 sm:grid-cols-2 lg:grid-cols-3"
      }
    >
      {quizzes.map((quiz) => (
        <QuizItem key={quiz.id} quiz={quiz} />
      ))}
    </div>
  );
};
