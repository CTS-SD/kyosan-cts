import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { quizKeys } from "@/features/quizzes/query-keys";
import type { QuizzesCursor } from "@/features/quizzes/types";
import { getQuizzes } from "@/server/services/quizzes";
import { QuizListClient } from "./quiz-list-client";

const QUIZZES_PAGE_SIZE = 24;

export const QuizList = async () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 60 * 1000 } },
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: quizKeys.list(),
    initialPageParam: null as QuizzesCursor,
    queryFn: ({ pageParam }) => getQuizzes({ limit: QUIZZES_PAGE_SIZE, cursor: pageParam, order: "desc" }),
    getNextPageParam: (last: { nextCursor: QuizzesCursor }) => last.nextCursor,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QuizListClient />
    </HydrationBoundary>
  );
};
