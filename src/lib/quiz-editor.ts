import z from "zod";

export const quizTypes = [
  {
    label: "選択問題",
    id: "select",
  },
  {
    label: "テキスト",
    id: "text",
  },
  {
    label: "○Xクイズ",
    id: "true_false",
  },
];

export const commonQuizFormSchema = z.object({
  question: z
    .string()
    .min(1, "問題文を入力してください。")
    .max(1000, "問題文は1000文字以内で入力してください。"),
  explanation: z.string().optional(),
  isPublished: z.boolean(),
});

export const selectQuizFormSchema = commonQuizFormSchema.extend({
  type: z.literal("select"),
  correctChoicesText: z.string().min(1, "正解の選択肢を入力してください。"),
  incorrectChoicesText: z.string().min(1, "不正解の選択肢を入力してください。"),
});

export const textQuizFormSchema = commonQuizFormSchema.extend({
  type: z.literal("text"),
  answer: z.string().min(1, "解答を入力してください。"),
});

export const trueFalseQuizFormSchema = commonQuizFormSchema.extend({
  type: z.literal("true_false"),
  answer: z.boolean("解答を選択してください。"),
});

export const quizFormSchema = z.discriminatedUnion("type", [
  selectQuizFormSchema,
  textQuizFormSchema,
  trueFalseQuizFormSchema,
]);

export type QuizFormValues = z.infer<typeof quizFormSchema>;
