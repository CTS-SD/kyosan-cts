import { getQuizListStats } from "@/lib/quiz/actions";
import { useQuery } from "@tanstack/react-query";

export const useQuizListStats = () => {
  const query = useQuery({
    queryKey: ["quiz-list-stats"],
    queryFn: getQuizListStats,
    staleTime: 1000 * 60 * 5,
  });

  return query;
};
