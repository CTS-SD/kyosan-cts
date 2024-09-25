import { pgEnum, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name"),
  email: varchar("email", { length: 256 }),
});

export const quizTypeEnum = pgEnum("quiz_type", ["select", "input", "ox"]);

export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  type: quizTypeEnum("type").notNull(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  fakes: text("fakes").array(),
});

export type Quiz = typeof quizzes.$inferSelect;
export type QuizType = (typeof quizTypeEnum.enumValues)[number];
export enum QuizTypeEnum {
  Select = "select",
  Input = "input",
  Ox = "ox",
}
