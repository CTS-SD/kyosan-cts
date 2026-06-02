import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchQuizzes, type QuizFilters } from "../api";
import { quizKeys } from "../query-keys";
import type { QuizzesCursor } from "../types";

const QUIZZES_PAGE_SIZE = 24;

export const useQuizzes = (filters?: QuizFilters) => {
  return useInfiniteQuery({
    queryKey: quizKeys.list(filters),
    initialPageParam: null as QuizzesCursor,
    queryFn: ({ pageParam }) =>
      fetchQuizzes({
        cursor: pageParam,
        limit: QUIZZES_PAGE_SIZE,
        ...filters,
      }),
    getNextPageParam: (page) => page.nextCursor,
  });
};
