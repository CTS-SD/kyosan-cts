import z from "zod";

export const StudentEditorSchema = z.object({
  name: z
    .string()
    .trim()
    .max(256)
    .refine((val) => /\s|・/.test(val), {
      message: "苗字と名前をスペースで区切って入力してください。",
    })
    .transform((val) => val.replace(/\s+/g, " ")),
  studentNumber: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "学籍番号は6桁の数字で入力してください。")
    .refine(
      (val) => [...val].reduce((sum, ch) => sum + Number(ch), 0) % 10 === 0,
      { message: "有効な学籍番号を入力してください。" }
    ),
  facultyId: z.number("学部を選択してください。").min(1),
  departmentId: z.number("配属部署を選択してください。").min(1),
});

export type StudentValues = z.infer<typeof StudentEditorSchema>;
