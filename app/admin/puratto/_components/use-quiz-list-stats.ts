import { useQuery } from "@tanstack/react-query";
import { getQuizListStats } from "@/features/quiz";

export const useQuizListStats = () => {
  const query = useQuery({
    queryKey: ["quiz-list-stats"],
    queryFn: getQuizListStats,
    staleTime: 1000 * 60 * 5,
  });

  return query;
};
