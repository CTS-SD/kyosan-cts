type QuizListFilters = {
  search?: string;
  tags?: string[];
  status?: "published" | "draft";
};

/**
 * TanStack Query keys for the quizzes feature.
 * `all` is the invalidation root: invalidating it also matches `list()`,
 * `count()` and `tags()` via TanStack Query's partial key matching.
 */
export const quizKeys = {
  all: ["quizzes"] as const,
  list: (filters?: QuizListFilters) =>
    [
      ...quizKeys.all,
      "list",
      { search: filters?.search ?? "", tags: filters?.tags ?? [], status: filters?.status ?? null },
    ] as const,
  count: () => [...quizKeys.all, "count"] as const,
  tags: () => [...quizKeys.all, "tags"] as const,
};
