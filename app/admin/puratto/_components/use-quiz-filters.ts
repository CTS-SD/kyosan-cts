"use client";

import { parseAsArrayOf, parseAsBoolean, parseAsString, parseAsStringLiteral, useQueryState } from "nuqs";

const QUIZ_STATUSES = ["published", "draft"] as const;
export type QuizStatus = (typeof QUIZ_STATUSES)[number];

/**
 * Shared URL-backed filter state for the admin quiz list (`?q=`, `?tags=`,
 * `?untagged=`, `?status=`). Reading it from the search input, the filter
 * dropdown and the list keeps all three in sync through the URL.
 *
 * `untagged` (match quizzes with no tags) and `tags` are mutually exclusive;
 * the filter dropdown clears one when the other is set.
 */
export const useQuizFilters = () => {
  const [q, setQ] = useQueryState("q", parseAsString.withDefault(""));
  const [tags, setTags] = useQueryState("tags", parseAsArrayOf(parseAsString).withDefault([]));
  const [untagged, setUntagged] = useQueryState("untagged", parseAsBoolean.withDefault(false));
  const [status, setStatus] = useQueryState("status", parseAsStringLiteral(QUIZ_STATUSES));

  return { q, setQ, tags, setTags, untagged, setUntagged, status, setStatus };
};
