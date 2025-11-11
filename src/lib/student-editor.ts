import z from "zod";

export const StudentNumberSchema = z
  .string()
  .trim()
  .regex(/^\d{6}$/, "6桁の数字で入力してください。")
  .refine((val) => [...val].reduce((sum, ch) => sum + Number(ch), 0) % 10 === 0, { message: "無効な学籍番号です。" });

export const StudentEditorSchema = z.object({
  name: z
    .string("氏名を入力してください。")
    .trim()
    .max(256, "氏名は256文字以内で入力してください。")
    .refine((val) => /\s|・/.test(val), {
      message: "苗字と名前をスペースで区切って入力してください。",
    })
    .transform((val) => val.replace(/\s+/g, " ")),
  studentNumber: StudentNumberSchema,
  facultyId: z.number("学部を選択してください。").min(1, "学部を選択してください。"),
  departmentId: z.number("配属部署を選択してください。").min(1, "配属部署を選択してください。"),
});

export type StudentValues = z.infer<typeof StudentEditorSchema>;
