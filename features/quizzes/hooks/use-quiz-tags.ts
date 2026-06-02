import { useQuery } from "@tanstack/react-query";
import { fetchQuizTags } from "../api";
import { quizKeys } from "../query-keys";

/** All tag names currently in use, for filter and editor tag suggestions. */
export const useQuizTags = () => {
  return useQuery({
    queryKey: quizKeys.tags(),
    queryFn: fetchQuizTags,
    staleTime: 60 * 1000,
  });
};
