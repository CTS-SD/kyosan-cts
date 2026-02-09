import z from "zod";
import { SelectQuizEditorSchema } from "./handlers/select.handler";
import { TextQuizEditorSchema } from "./handlers/text.handler";
import { TrueFalseQuizEditorSchema } from "./handlers/true-false.handler";

/**
 * Common fields for all quiz editor schemas.
 */
export const CommonQuizEditorSchema = z.object({
  id: z.number().nullable(),
  question: z.string().min(1, "問題文を入力してください。").max(1000, "問題文は1000文字以内で入力してください。"),
  explanation: z.string().nullable(),
  isPublished: z.boolean(),
});

/**
 * Discriminated union of all quiz editor schemas.
 */
export const QuizEditorSchema = z.discriminatedUnion("type", [
  SelectQuizEditorSchema,
  TextQuizEditorSchema,
  TrueFalseQuizEditorSchema,
]);

export type QuizEditorValues = z.infer<typeof QuizEditorSchema>;

/**
 * Helper to create default editor values from quiz data.
 */
export { SelectQuizEditorSchema, TextQuizEditorSchema, TrueFalseQuizEditorSchema };
