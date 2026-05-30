import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchQuizzes } from "../api";
import { quizKeys } from "../query-keys";
import type { QuizzesCursor } from "../types";

const QUIZZES_PAGE_SIZE = 24;

export const useQuizzes = () => {
  return useInfiniteQuery({
    queryKey: quizKeys.list(),
    initialPageParam: null as QuizzesCursor,
    queryFn: ({ pageParam }) =>
      fetchQuizzes({
        cursor: pageParam,
        limit: QUIZZES_PAGE_SIZE,
      }),
    getNextPageParam: (page) => page.nextCursor,
  });
};
