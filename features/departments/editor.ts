import { z } from "zod";

export const DepartmentEditorSchema = z.object({
  name: z
    .string({ error: "部署名を入力してください。" })
    .trim()
    .min(1, { error: "部署名を入力してください。" })
    .max(256, { error: "部署名は256文字以内で入力してください。" }),
  color: z
    .string({ error: "色を選択してください。" })
    .regex(/^#[0-9a-fA-F]{6}$/, { error: "色は #rrggbb 形式で入力してください。" }),
});

export type DepartmentValues = z.infer<typeof DepartmentEditorSchema>;
