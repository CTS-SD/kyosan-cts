import z from "zod";
import { SelectQuizTable } from "@/lib/db/schema";
import { splitByLines } from "@/lib/utils";
import { type SelectQuizData, SelectQuizSchema } from "../types";
import type { QuizTypeHandler } from "./index";

/**
 * Split a string by lines, trim each line, and remove empty lines.
 */
const findDuplicates = (arr: string[]) => {
  const seen = new Set<string>();
  const dup = new Set<string>();
  for (const item of arr) {
    if (seen.has(item)) dup.add(item);
    else seen.add(item);
  }
  return Array.from(dup);
};

export const SelectQuizEditorSchema = z
  .object({
    id: z.number().nullable(),
    type: z.literal("select"),
    question: z.string().min(1, "問題文を入力してください。").max(1000, "問題文は1000文字以内で入力してください。"),
    explanation: z.string().nullable(),
    isPublished: z.boolean(),
    correctChoicesText: z
      .string("正解の選択肢を入力してください。")
      .refine((val) => splitByLines(val).length > 0, {
        message: "正解の選択肢を入力してください。",
      })
      .transform((val) => splitByLines(val).join("\n")),
    incorrectChoicesText: z
      .string("不正解の選択肢を入力してください。")
      .refine((val) => splitByLines(val).length > 0, {
        message: "不正解の選択肢を入力してください。",
      })
      .transform((val) => splitByLines(val).join("\n")),
  })
  .superRefine((val, ctx) => {
    const correct = splitByLines(val.correctChoicesText);
    const incorrect = splitByLines(val.incorrectChoicesText);

    const dupCorrect = findDuplicates(correct);
    const dupIncorrect = findDuplicates(incorrect);

    const incorrectSet = new Set(incorrect);
    const overlap = Array.from(new Set(correct.filter((c) => incorrectSet.has(c))));

    if (dupCorrect.length > 0) {
      ctx.addIssue({
        code: "custom",
        path: ["correctChoicesText"],
        message: `選択肢が重複しています: ${dupCorrect.join(", ")}`,
      });
    }
    if (dupIncorrect.length > 0) {
      ctx.addIssue({
        code: "custom",
        path: ["incorrectChoicesText"],
        message: `選択肢が重複しています: ${dupIncorrect.join(", ")}`,
      });
    }
    if (overlap.length > 0) {
      ctx.addIssue({
        code: "custom",
        path: ["correctChoicesText"],
        message: `正解と不正解の選択肢が重複しています: ${overlap.join(", ")}`,
      });
      ctx.addIssue({
        code: "custom",
        path: ["incorrectChoicesText"],
        message: `正解と不正解の選択肢が重複しています: ${overlap.join(", ")}`,
      });
    }
  });

export type SelectQuizEditorValues = z.infer<typeof SelectQuizEditorSchema>;

export type SelectQuizDbRow = {
  quizId: number;
  correctChoices: string[];
  incorrectChoices: string[];
};

export const selectQuizHandler: QuizTypeHandler<SelectQuizData, SelectQuizEditorValues, SelectQuizDbRow> = {
  // Identity
  type: "select",

  // Schemas
  dataSchema: SelectQuizSchema,
  editorSchema: SelectQuizEditorSchema,

  // Validation & Judging
  validate: (quiz, inputValue) => {
    return quiz.correctChoices.length === inputValue.length;
  },
  judge: (quiz, inputValue) => {
    return (
      inputValue.length === quiz.correctChoices.length &&
      quiz.correctChoices.every((choice) => inputValue.includes(choice))
    );
  },

  // Transformations
  toEditorValues: (quiz) => ({
    id: quiz.id,
    type: quiz.type,
    question: quiz.question,
    explanation: quiz.explanation,
    isPublished: quiz.isPublished,
    correctChoicesText: quiz.correctChoices.join("\n"),
    incorrectChoicesText: quiz.incorrectChoices.join("\n"),
  }),
  fromEditorValues: (values) => ({
    type: "select",
    question: values.question,
    explanation: values.explanation,
    isPublished: values.isPublished,
    correctChoices: splitByLines(values.correctChoicesText),
    incorrectChoices: splitByLines(values.incorrectChoicesText),
  }),

  // Database
  table: SelectQuizTable,
  buildDbPayload: (quizId, values) => ({
    quizId,
    correctChoices: splitByLines(values.correctChoicesText),
    incorrectChoices: splitByLines(values.incorrectChoicesText),
  }),
  parseDbRow: (row) => ({
    correctChoices: row.correctChoices,
    incorrectChoices: row.incorrectChoices,
  }),

  // UI Metadata
  label: "選択問題",
  getPrompt: (quiz) =>
    `答えを${quiz.correctChoices.length > 1 ? `${quiz.correctChoices.length}つ` : ""}選択してください`,
};
