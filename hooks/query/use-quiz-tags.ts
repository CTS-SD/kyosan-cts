import { useQuery } from "@tanstack/react-query";
import { getTags } from "@/lib/quiz";

export const useQuizTags = () => {
  return useQuery({
    queryKey: ["quiz-tags"],
    queryFn: getTags,
    staleTime: 1000 * 60 * 5,
  });
};
