import type { InferSelectModel } from "drizzle-orm";
import { boolean, integer, jsonb, pgTable, primaryKey, serial, text, timestamp } from "drizzle-orm/pg-core";

/**
 * Per-type exclusive shape of the `params` jsonb payload.
 * This is the single source of truth for what each quiz type stores;
 * the Zod schema in `features/quizzes/types.ts` is checked against it.
 */
export type QuizParamsByType = {
  select: { correctChoices: string[]; incorrectChoices: string[] };
  text: { answer: string };
  true_false: { answer: boolean };
};

export type QuizType = keyof QuizParamsByType;
export type QuizParams = QuizParamsByType[QuizType];

export const QuizTable = pgTable("quiz", {
  id: serial("id").primaryKey(),
  type: text("type", { enum: ["select", "text", "true_false"] }).notNull(),
  question: text("question").notNull(),
  explanation: text("explanation"),
  params: jsonb("params").$type<QuizParams>().notNull(),
  isPublished: boolean("is_published").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const QuizTagTable = pgTable("quiz_tag", {
  name: text("name").primaryKey(),
});

export const QuizTagMapTable = pgTable(
  "quiz_tag_map",
  {
    quizId: integer("quiz_id")
      .notNull()
      .references(() => QuizTable.id, { onDelete: "cascade" }),
    tagName: text("tag_name")
      .notNull()
      .references(() => QuizTagTable.name, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.quizId, t.tagName] })],
);

export type Quiz = InferSelectModel<typeof QuizTable>;
