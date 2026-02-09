import { useQuery } from "@tanstack/react-query";
import { searchQuizzes } from "../../lib/quiz";

type Props = {
  keyword: string;
};

export const useQuizSearch = ({ keyword }: Props) => {
  const query = useQuery({
    queryKey: ["quiz-search", keyword],
    queryFn: () => searchQuizzes(keyword),
    enabled: keyword.length > 0,
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });

  return query;
};
