import { describe, expect, it } from "vitest";
import { QuizSchema } from "@/features/quizzes/types";

describe("QuizSchema", () => {
  it("revives an ISO createdAt string into a Date (RPC boundary)", () => {
    const result = QuizSchema.safeParse({
      id: 1,
      question: "Q",
      explanation: null,
      isPublished: true,
      tags: [],
      createdAt: "2026-06-03T00:00:00.000Z",
      type: "text",
      params: { answer: "x" },
    });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.createdAt).toBeInstanceOf(Date);
  });
});
