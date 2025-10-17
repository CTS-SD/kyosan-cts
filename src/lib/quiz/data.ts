import z from "zod";

export const CommonQuizSchema = z.object({
  id: z.number(),
  type: z.string(),
  question: z.string(),
  explanation: z.string().nullable(),
  isPublished: z.boolean(),
  createdAt: z.date(),
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

export type SelectQuizData = z.infer<typeof SelectQuizSchema>;
export type TextQuizData = z.infer<typeof TextQuizSchema>;
export type TrueFalseQuizData = z.infer<typeof TrueFalseQuizSchema>;
export type QuizData = SelectQuizData | TextQuizData | TrueFalseQuizData;
