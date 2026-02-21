import type { ZodSchema } from "zod";
import type { SelectQuizTable, TextQuizTable, TrueFalseQuizTable } from "../../../db/schema";
import type { QuizData, QuizType } from "../types";
import { selectQuizHandler } from "./select.handler";
import { textQuizHandler } from "./text.handler";
import { trueFalseQuizHandler } from "./true-false.handler";

type QuizSubTable = typeof SelectQuizTable | typeof TextQuizTable | typeof TrueFalseQuizTable;

export interface QuizTypeHandler<TData extends QuizData, TEditor, TDbRow> {
  type: QuizType;

  validate: (quiz: TData, inputValue: string[]) => boolean;
  judge: (quiz: TData, inputValue: string[]) => boolean;

  dataSchema: ZodSchema<TData>;
  editorSchema: ZodSchema<TEditor>;

  toEditorValues: (quiz: TData) => TEditor;
  fromEditorValues: (values: TEditor) => Partial<TData>;

  table: QuizSubTable;
  buildDbPayload: (quizId: number, values: TEditor) => TDbRow;
  parseDbRow: (row: TDbRow) => Partial<TData>;

  label: string;
  getPrompt: (quiz: TData) => string;
}

export const quizHandlers = {
  select: selectQuizHandler,
  text: textQuizHandler,
  true_false: trueFalseQuizHandler,
} as const;

export function getQuizHandler<T extends QuizType>(type: T): (typeof quizHandlers)[T] {
  return quizHandlers[type];
}

export function validateQuizInput(quiz: QuizData, inputValue: string[]): boolean {
  return getQuizHandler(quiz.type).validate(quiz as never, inputValue);
}

export function judgeQuizInput(quiz: QuizData, inputValue: string[]): boolean {
  return getQuizHandler(quiz.type).judge(quiz as never, inputValue);
}

export function getQuizTypeLabel(type: QuizType): string {
  return getQuizHandler(type).label;
}

export function getQuizPrompt(quiz: QuizData): string {
  return getQuizHandler(quiz.type).getPrompt(quiz as never);
}

export function getQuizTypes() {
  return Object.entries(quizHandlers).map(([id, handler]) => ({
    id: id as QuizType,
    label: handler.label,
  }));
}
