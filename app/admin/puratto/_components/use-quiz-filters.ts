"use client";

import { parseAsArrayOf, parseAsString, parseAsStringLiteral, useQueryState } from "nuqs";

export const QUIZ_STATUSES = ["published", "draft"] as const;
export type QuizStatus = (typeof QUIZ_STATUSES)[number];

/**
 * Shared URL-backed filter state for the admin quiz list (`?q=`, `?tags=`,
 * `?status=`). Reading it from the search input, the filter dropdown and the
 * list keeps all three in sync through the URL.
 */
export const useQuizFilters = () => {
  const [q, setQ] = useQueryState("q", parseAsString.withDefault(""));
  const [tags, setTags] = useQueryState("tags", parseAsArrayOf(parseAsString).withDefault([]));
  const [status, setStatus] = useQueryState("status", parseAsStringLiteral(QUIZ_STATUSES));

  return { q, setQ, tags, setTags, status, setStatus };
};
