"use client";

import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { Suspense } from "react";
import { QuizList } from "./quiz-list";
import { QuizListSkeleton } from "./quiz-list-skeleton";
import { QuizSearchResults } from "./quiz-search-results";

const QuizListWrapper = () => {
  const [query] = useQueryState("q", {
    defaultValue: "",
  });
  const [tags] = useQueryState("tags", parseAsArrayOf(parseAsString).withDefault([]));

  return (
    <Suspense key={`${query}-${tags.join(",")}`} fallback={<QuizListSkeleton />}>
      {query.length > 0 ? <QuizSearchResults tags={tags} /> : <QuizList tags={tags} />}
    </Suspense>
  );
};

export default QuizListWrapper;
