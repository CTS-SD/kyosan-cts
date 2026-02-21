import z from "zod";
import { SelectQuizEditorSchema } from "./handlers/select";
import { TextQuizEditorSchema } from "./handlers/text";
import { TrueFalseQuizEditorSchema } from "./handlers/true-false";

export const CommonQuizEditorSchema = z.object({
  id: z.number().nullable(),
  question: z.string().min(1, "問題文を入力してください。").max(1000, "問題文は1000文字以内で入力してください。"),
  explanation: z.string().nullable(),
  isPublished: z.boolean(),
  tags: z.array(z.string()),
});

export const QuizEditorSchema = z.discriminatedUnion("type", [
  SelectQuizEditorSchema,
  TextQuizEditorSchema,
  TrueFalseQuizEditorSchema,
]);

export type QuizEditorValues = z.infer<typeof QuizEditorSchema>;

export { SelectQuizEditorSchema, TextQuizEditorSchema, TrueFalseQuizEditorSchema };
