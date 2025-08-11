import { InferSelectModel } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const QuizTable = pgTable("quiz", {
  id: serial("id").primaryKey(),
  type: text("type", { enum: ["select", "text", "true_false"] }).notNull(),
  question: text("question").notNull(),
  explanation: text("explanation"),
  isPublished: boolean("is_published").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const SelectQuizTable = pgTable("select_quiz", {
  quizId: integer("quiz_id")
    .references(() => QuizTable.id, { onDelete: "cascade" })
    .primaryKey(),
  correctChoicesText: text("correct_choices_text").notNull(),
  incorrectChoicesText: text("incorrect_choices_text").notNull(),
});

export const TextQuizTable = pgTable("text_quiz", {
  quizId: integer("quiz_id")
    .references(() => QuizTable.id, { onDelete: "cascade" })
    .primaryKey(),
  answer: text("answer").notNull(),
});

export const TFQuizTable = pgTable("true_false_quiz", {
  quizId: integer("quiz_id")
    .references(() => QuizTable.id, { onDelete: "cascade" })
    .primaryKey(),
  answer: boolean("answer").notNull(),
});

export type Quiz = InferSelectModel<typeof QuizTable>;
