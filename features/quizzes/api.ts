import { api } from "@/lib/api-client";
import { type QuizInput, QuizSchema, type QuizzesCursor } from "./types";

export async function fetchQuizzes(input: { cursor: QuizzesCursor; limit: number }) {
  const res = await api.quizzes.$get({
    query: {
      cursor: input.cursor ?? undefined,
      limit: String(input.limit),
      order: "desc",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch quizzes");
  }
  const { items, nextCursor } = await res.json();
  // Revive each item into the domain Quiz (discriminated union + real Date).
  return { items: items.map((item) => QuizSchema.parse(item)), nextCursor };
}

export async function fetchQuizCounts() {
  const res = await api.quizzes.count.$get();
  if (!res.ok) {
    throw new Error("Failed to fetch quiz counts");
  }
  return res.json();
}

export async function createQuiz(input: QuizInput) {
  const res = await api.quizzes.$post({ json: input });
  if (!res.ok) {
    throw new Error("Failed to create quiz");
  }
  return res.json();
}

export async function updateQuiz(id: number, input: QuizInput) {
  const res = await api.quizzes[":id"].$put({ param: { id: String(id) }, json: input });
  if (!res.ok) {
    throw new Error("Failed to update quiz");
  }
  return res.json();
}

export async function deleteQuiz(id: number) {
  const res = await api.quizzes[":id"].$delete({ param: { id: String(id) } });
  if (!res.ok) {
    throw new Error("Failed to delete quiz");
  }
  return res.json();
}

export async function saveQuizSession(input: {
  results: { quizId: number; isCorrect: boolean }[];
  startedAt: number;
  finishedAt: number;
}) {
  const res = await api.sessions.$post({ json: input });
  if (!res.ok) {
    throw new Error("Failed to save quiz session");
  }
  return res.json();
}
