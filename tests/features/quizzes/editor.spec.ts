import { describe, expect, it } from "vitest";
import {
  fromEditorValues,
  makePseudoQuiz,
  QuizEditorSchema,
  type QuizEditorValues,
  toEditorValues,
} from "@/features/quizzes/editor";
import type { Quiz } from "@/features/quizzes/types";

const editorBase = { id: null, question: "問題文", explanation: null, isPublished: true, tags: [] };

describe("QuizEditorSchema (select)", () => {
  const parse = (correctChoicesText: string, incorrectChoicesText: string) =>
    QuizEditorSchema.safeParse({ ...editorBase, type: "select", correctChoicesText, incorrectChoicesText });

  it("accepts valid choices and normalizes the text", () => {
    const result = parse("  正解1 \n 正解2 ", "不正解1\n不正解2");
    expect(result.success).toBe(true);
    if (result.success && result.data.type === "select") {
      expect(result.data.correctChoicesText).toBe("正解1\n正解2");
    }
  });

  it("rejects duplicates within correct choices", () => {
    expect(parse("a\na", "x").success).toBe(false);
  });

  it("rejects duplicates within incorrect choices", () => {
    expect(parse("a", "x\nx").success).toBe(false);
  });

  it("rejects overlap between correct and incorrect, flagging both fields", () => {
    const result = parse("a", "a");
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path[0]);
      expect(paths).toContain("correctChoicesText");
      expect(paths).toContain("incorrectChoicesText");
    }
  });

  it("rejects empty choice fields", () => {
    expect(parse("", "x").success).toBe(false);
    expect(parse("a", "").success).toBe(false);
  });
});

describe("QuizEditorSchema (text)", () => {
  const parse = (textAnswer: string) => QuizEditorSchema.safeParse({ ...editorBase, type: "text", textAnswer });

  it("dedupes answers ignoring whitespace and periods", () => {
    const result = parse("答え1\n答え2");
    expect(result.success).toBe(true);
    if (result.success && result.data.type === "text") {
      expect(result.data.textAnswer).toBe("答え1\n答え2");
    }
  });

  it("rejects loosely-duplicate answers", () => {
    // "a.b" and "a b" both normalize to "ab"
    expect(parse("a.b\na b").success).toBe(false);
  });

  it("rejects an empty answer", () => {
    expect(parse("   ").success).toBe(false);
  });
});

describe("QuizEditorSchema (true_false)", () => {
  it("requires a boolean answer", () => {
    expect(QuizEditorSchema.safeParse({ ...editorBase, type: "true_false", trueFalseAnswer: true }).success).toBe(true);
    expect(QuizEditorSchema.safeParse({ ...editorBase, type: "true_false" }).success).toBe(false);
  });
});

describe("toEditorValues / fromEditorValues round-trip", () => {
  const quizBase = { question: "Q", explanation: "解説", isPublished: true, tags: ["t"], createdAt: new Date() };

  const quizzes: Quiz[] = [
    { ...quizBase, id: 1, type: "select", params: { correctChoices: ["a"], incorrectChoices: ["b", "c"] } },
    { ...quizBase, id: 2, type: "text", params: { answer: "答え" } },
    { ...quizBase, id: 3, type: "true_false", params: { answer: false } },
  ];

  it.each(quizzes)("preserves params for $type", (quiz) => {
    const payload = fromEditorValues(toEditorValues(quiz));
    expect(payload.type).toBe(quiz.type);
    expect(payload.params).toEqual(quiz.params);
  });
});

describe("makePseudoQuiz", () => {
  it("builds a transient quiz with id -1 and a Date", () => {
    const values: QuizEditorValues = { ...editorBase, type: "true_false", trueFalseAnswer: true };
    const quiz = makePseudoQuiz(values);
    expect(quiz.id).toBe(-1);
    expect(quiz.createdAt).toBeInstanceOf(Date);
  });
});
