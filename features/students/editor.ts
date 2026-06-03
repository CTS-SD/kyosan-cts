import z from "zod";

export const StudentNumberSchema = z
  .string()
  .trim()
  .min(1, { error: "学籍番号を入力してください。" })
  .regex(/^\d{6}$/, { error: "6桁の数字で入力してください。" })
  .refine((val) => [...val].reduce((sum, ch) => sum + Number(ch), 0) % 10 === 0, { error: "無効な学籍番号です。" });

export const StudentEditorSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { error: "氏名を入力してください。" })
    .max(256, { error: "氏名は256文字以内で入力してください。" })
    .refine((val) => /\s|・/.test(val), {
      error: "苗字と名前をスペース区切りで入力してください。",
    })
    .transform((val) => val.replace(/\s+/g, " ")),
  studentNumber: StudentNumberSchema,
  facultyId: z.number({ error: "学部を選択してください。" }).min(1, { error: "学部を選択してください。" }),
  departmentId: z.number({ error: "配属部署を選択してください。" }).min(1, { error: "配属部署を選択してください。" }),
});

export type StudentValues = z.infer<typeof StudentEditorSchema>;
