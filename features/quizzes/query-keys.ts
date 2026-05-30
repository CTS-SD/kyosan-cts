/**
 * TanStack Query keys for the quizzes feature.
 * `all` is the invalidation root: invalidating it also matches `list()` and
 * `count()` via TanStack Query's partial key matching.
 */
export const quizKeys = {
  all: ["quizzes"] as const,
  list: () => [...quizKeys.all, "list"] as const,
  count: () => [...quizKeys.all, "count"] as const,
};
