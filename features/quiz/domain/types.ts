import z from "zod";

export const QUIZ_TYPE_IDS = ["select", "text", "true_false"] as const;

export const CommonQuizSchema = z.object({
  id: z.number(),
  type: z.string(),
  question: z.string(),
  explanation: z.string().nullable(),
  isPublished: z.boolean(),
  createdAt: z.date(),
  tags: z.array(z.string()).default([]),
});

export const SelectQuizSchema = CommonQuizSchema.extend({
  type: z.literal("select"),
  correctChoices: z.array(z.string()),
  incorrectChoices: z.array(z.string()),
});

export const TextQuizSchema = CommonQuizSchema.extend({
  type: z.literal("text"),
  answer: z.string(),
});

export const TrueFalseQuizSchema = CommonQuizSchema.extend({
  type: z.literal("true_false"),
  answer: z.boolean(),
});

export type SelectQuiz = z.infer<typeof SelectQuizSchema>;
export type TextQuiz = z.infer<typeof TextQuizSchema>;
export type TrueFalseQuiz = z.infer<typeof TrueFalseQuizSchema>;

export type Quiz = SelectQuiz | TextQuiz | TrueFalseQuiz;
export type QuizType = Quiz["type"];
