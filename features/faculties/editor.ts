import { z } from "zod";

export const FacultyEditorSchema = z.object({
  name: z
    .string({ error: "学部名を入力してください。" })
    .trim()
    .min(1, { error: "学部名を入力してください。" })
    .max(256, { error: "学部名は256文字以内で入力してください。" }),
});

export type FacultyValues = z.infer<typeof FacultyEditorSchema>;
