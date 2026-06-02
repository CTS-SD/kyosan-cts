import { describe, expect, it } from "vitest";
import { getQuizPrompt, getQuizTypes, judgeQuizInput, validateQuizInput } from "@/features/quizzes/domain";
import type { SelectQuiz, TextQuiz, TrueFalseQuiz } from "@/features/quizzes/types";

const base = { question: "Q", explanation: null, isPublished: true, tags: [], createdAt: new Date() };

const selectQuiz = (correctChoices: string[]): SelectQuiz => ({
  ...base,
  id: 1,
  type: "select",
  params: { correctChoices, incorrectChoices: ["x", "y"] },
});

const textQuiz = (answer: string): TextQuiz => ({ ...base, id: 2, type: "text", params: { answer } });

const trueFalseQuiz = (answer: boolean): TrueFalseQuiz => ({
  ...base,
  id: 3,
  type: "true_false",
  params: { answer },
});

describe("judgeQuizInput", () => {
  it("select: matches as a set regardless of order", () => {
    const quiz = selectQuiz(["a", "b"]);
    expect(judgeQuizInput(quiz, ["b", "a"])).toBe(true);
  });

  it("select: false when counts differ", () => {
    const quiz = selectQuiz(["a", "b"]);
    expect(judgeQuizInput(quiz, ["a"])).toBe(false);
    expect(judgeQuizInput(quiz, ["a", "b", "c"])).toBe(false);
  });

  it("text: ignores inner and surrounding whitespace", () => {
    expect(judgeQuizInput(textQuiz("京都産業大学"), ["  京都 産業 大学  "])).toBe(true);
  });

  it("text: matches any of the newline-separated answers", () => {
    const quiz = textQuiz("はい\nyes");
    expect(judgeQuizInput(quiz, ["yes"])).toBe(true);
    expect(judgeQuizInput(quiz, ["はい"])).toBe(true);
    expect(judgeQuizInput(quiz, ["no"])).toBe(false);
  });

  it.each([
    ["true", true, true],
    ["false", false, true],
    ["true", false, false],
    ["maybe", true, false],
  ])("true_false: input %s vs answer %s -> %s", (input, answer, expected) => {
    expect(judgeQuizInput(trueFalseQuiz(answer), [input])).toBe(expected);
  });
});

describe("validateQuizInput", () => {
  it("select: requires a non-empty selection matching the correct count", () => {
    const quiz = selectQuiz(["a", "b"]);
    expect(validateQuizInput(quiz, ["a", "b"])).toBe(true);
    expect(validateQuizInput(quiz, ["a"])).toBe(false);
    expect(validateQuizInput(selectQuiz([]), [])).toBe(false);
  });

  it("text: requires non-blank input", () => {
    const quiz = textQuiz("x");
    expect(validateQuizInput(quiz, ["a"])).toBe(true);
    expect(validateQuizInput(quiz, ["   "])).toBe(false);
  });

  it.each([
    ["true", true],
    ["false", true],
    ["", false],
    ["yes", false],
  ])("true_false: input %s -> %s", (input, expected) => {
    expect(validateQuizInput(trueFalseQuiz(true), [input])).toBe(expected);
  });
});

describe("getQuizPrompt", () => {
  it("select: pluralizes when more than one answer", () => {
    expect(getQuizPrompt(selectQuiz(["a", "b"]))).toContain("2つ");
    expect(getQuizPrompt(selectQuiz(["a"]))).not.toContain("つ");
  });

  it("returns fixed prompts for text and true_false", () => {
    expect(getQuizPrompt(textQuiz("x"))).toBe("答えを入力してください");
    expect(getQuizPrompt(trueFalseQuiz(true))).toBe("○か✗を選択してください");
  });
});

describe("getQuizTypes", () => {
  it("returns all three quiz types", () => {
    expect(getQuizTypes().map((t) => t.id)).toEqual(["select", "text", "true_false"]);
  });
});
