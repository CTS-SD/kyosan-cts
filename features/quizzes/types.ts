import { z } from "zod";
import type { QuizParamsByType, QuizType } from "@/db/schema/quiz";

export type QuizzesCursor = string | null | undefined;

/**
 * Zod schemas for the per-type `params` jsonb payload.
 * `satisfies` ties them to QuizParamsByType so the two can never drift:
 * change a shape in the schema file and this fails to compile until updated.
 */
const quizParams = {
  select: z.object({
    correctChoices: z.array(z.string()),
    incorrectChoices: z.array(z.string()),
  }),
  text: z.object({ answer: z.string() }),
  true_false: z.object({ answer: z.boolean() }),
} satisfies { [K in QuizType]: z.ZodType<QuizParamsByType[K]> };

const quizBase = {
  id: z.number(),
  question: z.string(),
  explanation: z.string().nullable(),
  isPublished: z.boolean(),
  // coerce so the same schema parses both a Date (server-side rows) and an
  // ISO string (client-side, after JSON serialization over the RPC boundary).
  createdAt: z.coerce.date(),
};

/**
 * A quiz as a discriminated union: `type` and `params` are correlated,
 * so narrowing on `quiz.type` narrows `quiz.params` to the matching shape.
 */
export const QuizSchema = z.discriminatedUnion("type", [
  z.object({ ...quizBase, type: z.literal("select"), params: quizParams.select }),
  z.object({ ...quizBase, type: z.literal("text"), params: quizParams.text }),
  z.object({ ...quizBase, type: z.literal("true_false"), params: quizParams.true_false }),
]);

export type Quiz = z.infer<typeof QuizSchema>;

/** Write payload for create/update: a quiz without its server-managed `id` / `createdAt`. */
const quizInputBase = {
  question: z.string().min(1).max(1000),
  explanation: z.string().nullable(),
  isPublished: z.boolean(),
};

export const QuizInputSchema = z.discriminatedUnion("type", [
  z.object({ ...quizInputBase, type: z.literal("select"), params: quizParams.select }),
  z.object({ ...quizInputBase, type: z.literal("text"), params: quizParams.text }),
  z.object({ ...quizInputBase, type: z.literal("true_false"), params: quizParams.true_false }),
]);

export type QuizInput = z.infer<typeof QuizInputSchema>;

export type { QuizType } from "@/db/schema/quiz";

/** Narrowed quiz variants by `type`. */
export type SelectQuiz = Extract<Quiz, { type: "select" }>;
export type TextQuiz = Extract<Quiz, { type: "text" }>;
export type TrueFalseQuiz = Extract<Quiz, { type: "true_false" }>;

/** A single answered question within a play session. */
export type QuizResult = {
  quizId: number;
  userAnswer: string[];
  isCorrect: boolean;
};
