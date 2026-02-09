import z from "zod";
import { TextQuizTable } from "../../../db/schema";
import { splitByLines } from "../../../utils";
import { type TextQuizData, TextQuizSchema } from "../types";
import type { QuizTypeHandler } from "./index";

/**
 * Split a string by lines, trim each line, and remove empty lines.
 * Ignores whitespace and periods on each line.
 */
const looseSplitByLines = (str: string) => splitByLines(str).map((line) => line.replace(/\s|\./g, ""));

const findDuplicates = (arr: string[]) => {
  const seen = new Set<string>();
  const dup = new Set<string>();
  for (const item of arr) {
    if (seen.has(item)) dup.add(item);
    else seen.add(item);
  }
  return Array.from(dup);
};

export const TextQuizEditorSchema = z.object({
  id: z.number().nullable(),
  type: z.literal("text"),
  question: z.string().min(1, "問題文を入力してください。").max(1000, "問題文は1000文字以内で入力してください。"),
  explanation: z.string().nullable(),
  isPublished: z.boolean(),
  textAnswer: z
    .string("解答を入力してください。")
    .refine((val) => splitByLines(val).length > 0, {
      message: "解答を入力してください。",
    })
    .superRefine((val, ctx) => {
      const answers = looseSplitByLines(val);
      const dup = findDuplicates(answers);
      if (dup.length > 0) {
        ctx.addIssue({
          code: "custom",
          message: `解答が重複しています: ${dup.join(", ")}`,
        });
      }
    })
    .transform((val) => Array.from(new Set(looseSplitByLines(val))).join("\n")),
});

export type TextQuizEditorValues = z.infer<typeof TextQuizEditorSchema>;

export type TextQuizDbRow = {
  quizId: number;
  answer: string;
};

export const textQuizHandler: QuizTypeHandler<TextQuizData, TextQuizEditorValues, TextQuizDbRow> = {
  // Identity
  type: "text",

  // Schemas
  dataSchema: TextQuizSchema,
  editorSchema: TextQuizEditorSchema,

  // Validation & Judging
  validate: (_quiz, inputValue) => {
    return (inputValue[0]?.trim().length ?? 0) > 0;
  },
  judge: (quiz, inputValue) => {
    const normalizedInput = inputValue[0]?.trim().replace(/\s+/g, "") ?? "";
    const acceptedAnswers = quiz.answer.split("\n");
    return acceptedAnswers.some((answer) => answer.trim().replace(/\s+/g, "") === normalizedInput);
  },

  // Transformations
  toEditorValues: (quiz) => ({
    id: quiz.id,
    type: quiz.type,
    question: quiz.question,
    explanation: quiz.explanation,
    isPublished: quiz.isPublished,
    textAnswer: quiz.answer,
  }),
  fromEditorValues: (values) => ({
    type: "text",
    question: values.question,
    explanation: values.explanation,
    isPublished: values.isPublished,
    answer: values.textAnswer,
  }),

  // Database
  table: TextQuizTable,
  buildDbPayload: (quizId, values) => ({
    quizId,
    answer: values.textAnswer,
  }),
  parseDbRow: (row) => ({
    answer: row.answer,
  }),

  // UI Metadata
  label: "テキスト",
  getPrompt: () => "答えを入力してください",
};
