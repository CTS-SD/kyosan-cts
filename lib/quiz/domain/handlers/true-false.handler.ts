import z from "zod";
import { TrueFalseQuizTable } from "../../../db/schema";
import { type TrueFalseQuizData, TrueFalseQuizSchema } from "../types";
import type { QuizTypeHandler } from "./index";

export const TrueFalseQuizEditorSchema = z.object({
  id: z.number().nullable(),
  type: z.literal("true_false"),
  question: z.string().min(1, "問題文を入力してください。").max(1000, "問題文は1000文字以内で入力してください。"),
  explanation: z.string().nullable(),
  isPublished: z.boolean(),
  trueFalseAnswer: z.boolean("解答を選択してください。"),
});

export type TrueFalseQuizEditorValues = z.infer<typeof TrueFalseQuizEditorSchema>;

export type TrueFalseQuizDbRow = {
  quizId: number;
  answer: boolean;
};

export const trueFalseQuizHandler: QuizTypeHandler<TrueFalseQuizData, TrueFalseQuizEditorValues, TrueFalseQuizDbRow> = {
  // Identity
  type: "true_false",

  // Schemas
  dataSchema: TrueFalseQuizSchema,
  editorSchema: TrueFalseQuizEditorSchema,

  // Validation & Judging
  validate: (_quiz, inputValue) => {
    const value = inputValue[0];
    return value === "true" || value === "false";
  },
  judge: (quiz, inputValue) => {
    const value = inputValue[0];
    if (value === "true") return quiz.answer === true;
    if (value === "false") return quiz.answer === false;
    return false;
  },

  // Transformations
  toEditorValues: (quiz) => ({
    id: quiz.id,
    type: quiz.type,
    question: quiz.question,
    explanation: quiz.explanation,
    isPublished: quiz.isPublished,
    trueFalseAnswer: quiz.answer,
  }),
  fromEditorValues: (values) => ({
    type: "true_false",
    question: values.question,
    explanation: values.explanation,
    isPublished: values.isPublished,
    answer: values.trueFalseAnswer,
  }),

  // Database
  table: TrueFalseQuizTable,
  buildDbPayload: (quizId, values) => ({
    quizId,
    answer: values.trueFalseAnswer,
  }),
  parseDbRow: (row) => ({
    answer: row.answer,
  }),

  // UI Metadata
  label: "○✗クイズ",
  getPrompt: () => "○か✗を選択してください",
};
