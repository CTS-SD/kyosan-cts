import z from "zod";
import { QuizData } from "./quiz-data";

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

export const CommonQuizEditorSchema = z.object({
  question: z
    .string()
    .min(1, "問題文を入力してください。")
    .max(1000, "問題文は1000文字以内で入力してください。"),
  explanation: z.string().optional(),
  isPublished: z.boolean(),
});

export const SelectQuizEditorSchema = CommonQuizEditorSchema.extend({
  type: z.literal("select"),
  correctChoicesText: z.string().min(1, "正解の選択肢を入力してください。"),
  incorrectChoicesText: z.string().min(1, "不正解の選択肢を入力してください。"),
});

export const TextQuizEditorSchema = CommonQuizEditorSchema.extend({
  type: z.literal("text"),
  answer: z.string().min(1, "解答を入力してください。"),
});

export const TrueFalseQuizEditorSchema = CommonQuizEditorSchema.extend({
  type: z.literal("true_false"),
  answer: z.boolean("解答を選択してください。"),
});

export const QuizEditorSchema = z.discriminatedUnion("type", [
  SelectQuizEditorSchema,
  TextQuizEditorSchema,
  TrueFalseQuizEditorSchema,
]);

export type QuizValues = z.infer<typeof QuizEditorSchema>;

export function makePseudoQuiz(values: QuizValues): QuizData | null {
  const commonData = {
    id: -1,
    question: values.question,
    explanation: values.explanation ?? null,
    createdAt: new Date(),
    isPublished: values.isPublished,
  };

  if (values.type === "select") {
    return {
      ...commonData,
      type: values.type,
      correctChoicesText: values.correctChoicesText,
      incorrectChoicesText: values.incorrectChoicesText,
    };
  }
  if (values.type === "text") {
    return {
      ...commonData,
      type: values.type,
      answer: values.answer,
    };
  }
  if (values.type === "true_false") {
    return {
      ...commonData,
      type: values.type,
      answer: values.answer,
    };
  }
  return null;
}
