"use client";

import { useQueryState } from "nuqs";
import { QuizSearchResults } from "./quiz-search-results";
import { QuizList } from "./quiz-list";
import { Suspense } from "react";
import { QuizListSkeleton } from "./quiz-list-skeleton";

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
