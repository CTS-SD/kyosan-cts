"use client";

import { useQueryState } from "nuqs";
import { Suspense } from "react";
import { QuizList } from "./quiz-list";
import { QuizListSkeleton } from "./quiz-list-skeleton";
import { QuizSearchResults } from "./quiz-search-results";

const QuizListWrapper = () => {
  const [query] = useQueryState("q", {
    defaultValue: "",
  });

  return (
    <Suspense key={query} fallback={<QuizListSkeleton />}>
      {query.length > 0 ? <QuizSearchResults /> : <QuizList />}
    </Suspense>
  );
};

export default QuizListWrapper;
