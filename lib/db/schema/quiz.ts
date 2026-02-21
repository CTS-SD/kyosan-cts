import { type InferSelectModel, sql } from "drizzle-orm";
import { boolean, integer, pgTable, primaryKey, serial, text, timestamp } from "drizzle-orm/pg-core";

export const QuizTable = pgTable("quiz", {
  id: serial("id").primaryKey(),
  type: text("type", { enum: ["select", "text", "true_false"] }).notNull(),
  question: text("question").notNull(),
  explanation: text("explanation"),
  isPublished: boolean("is_published").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const SelectQuizTable = pgTable("select_quiz", {
  quizId: integer("quiz_id")
    .primaryKey()
    .references(() => QuizTable.id, { onDelete: "cascade" }),
  correctChoices: text("correct_choices").array().notNull().default(sql`ARRAY[]::text[]`),
  incorrectChoices: text("incorrect_choices").array().notNull().default(sql`ARRAY[]::text[]`),
});

export const TextQuizTable = pgTable("text_quiz", {
  quizId: integer("quiz_id")
    .primaryKey()
    .references(() => QuizTable.id, { onDelete: "cascade" }),
  answer: text("answer").notNull(),
});

export const TrueFalseQuizTable = pgTable("true_false_quiz", {
  quizId: integer("quiz_id")
    .primaryKey()
    .references(() => QuizTable.id, { onDelete: "cascade" }),
  answer: boolean("answer").notNull(),
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
