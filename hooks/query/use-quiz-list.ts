import { useInfiniteQuery } from "@tanstack/react-query";
import { getQuizzes } from "../../lib/quiz";

const PAGE_SIZE = 24;

export const useQuizList = () => {
  const query = useInfiniteQuery({
    queryKey: ["quizzes"],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) =>
      getQuizzes({
        limit: PAGE_SIZE,
        offset: pageParam,
      }),
    getNextPageParam: (last) => (last.hasMore ? last.nextCursor : undefined),
    staleTime: 1000 * 60 * 5,
  });

  const quizzes = query.data?.pages.flatMap((p) => p.quizzes) ?? [];

  return {
    quizzes,
    ...query,
  };
};
