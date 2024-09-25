import { pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const quizTypeEnum = pgEnum("quiz_type", ["select", "input", "ox"]);

export const quizzes = pgTable("quizzes", {
  id: uuid("id").defaultRandom().primaryKey(),
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
