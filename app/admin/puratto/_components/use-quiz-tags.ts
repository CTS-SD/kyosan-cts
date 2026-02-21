import { useQuery } from "@tanstack/react-query";
import { getTags } from "@/features/quiz";

export const useQuizTags = () => {
  return useQuery({
    queryKey: ["quiz-tags"],
    queryFn: getTags,
    staleTime: 1000 * 60 * 5,
  });
};
