import { useQuery } from "@tanstack/react-query";
import { searchQuizzes } from "@/features/quiz";

type Props = {
  keyword: string;
  tags?: string[];
};

export const useQuizSearch = ({ keyword, tags }: Props) => {
  const query = useQuery({
    queryKey: ["quiz-search", keyword, tags ?? []],
    queryFn: () => searchQuizzes(keyword, tags),
    enabled: keyword.length > 0,
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });

  return query;
};
