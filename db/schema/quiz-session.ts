import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { QuizTable } from "./quiz";

export const QuizSessionTable = pgTable("quiz_session", {
  id: serial("id").primaryKey(),
  userId: text("user_id").references(() => user.id, { onDelete: "set null" }),
  totalCount: integer("total_count").notNull(),
  correctCount: integer("correct_count").notNull(),
  startedAt: timestamp("started_at", { withTimezone: true }).notNull(),
  finishedAt: timestamp("finished_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const QuizSessionResultTable = pgTable("quiz_session_result", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id")
    .notNull()
    .references(() => QuizSessionTable.id, { onDelete: "cascade" }),
  quizId: integer("quiz_id")
    .notNull()
    .references(() => QuizTable.id, { onDelete: "cascade" }),
  isCorrect: boolean("is_correct").notNull(),
});
