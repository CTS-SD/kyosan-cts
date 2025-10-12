"use server";

import { desc, eq, sql } from "drizzle-orm";
import { db } from "../db";
import {
  QuizTable,
  SelectQuizTable,
  TextQuizTable,
  TrueFalseQuizTable,
} from "../db/schema";
import { QuizValues } from "./editor";
import { quizTypeHandlers } from "./handlers";
import {
  QuizData,
  SelectQuizSchema,
  TextQuizSchema,
  TrueFalseQuizSchema,
} from "./data";

export async function insertQuiz(values: QuizValues) {
  const [{ id: quizId }] = await db
    .insert(QuizTable)
    .values({
      type: values.type,
      question: values.question,
      explanation: values.explanation,
      isPublished: values.isPublished,
    })
    .returning({ id: QuizTable.id });

  const handler = quizTypeHandlers[values.type];
  const payload = handler.buildPayload(quizId, values);
  await db.insert(handler.table).values(payload);

  return quizId;
}

export async function updateQuiz(quizId: number, values: QuizValues) {
  await db
    .update(QuizTable)
    .set({
      type: values.type,
      question: values.question,
      explanation: values.explanation,
      isPublished: values.isPublished,
    })
    .where(eq(QuizTable.id, quizId));

  const handler = quizTypeHandlers[values.type];
  const payload = handler.buildPayload(quizId, values);

  await db.insert(handler.table).values(payload).onConflictDoUpdate({
    target: handler.table.quizId,
    set: payload,
  });
}

export async function getQuizById(id: number) {
  const quiz = await db.query.QuizTable.findFirst({
    where: (t, { eq }) => eq(t.id, id),
  });
  if (!quiz) throw new Error(`Quiz not found: ${id}`);

  const handler = quizTypeHandlers[quiz.type];
  const [extra] = await db
    .select()
    .from(handler.table)
    .where(eq(handler.table.quizId, quiz.id));

  return handler.dataSchema.parse({ ...quiz, ...extra });
}

export async function getQuizzes({
  limit,
  orderBy,
}: {
  limit: number;
  orderBy: "random" | "created_at_desc";
}) {
  const orderByMap = {
    random: sql`random()`,
    created_at_desc: desc(QuizTable.createdAt),
  };

  const rows = await db
    .select({
      id: QuizTable.id,
      type: QuizTable.type,
      question: QuizTable.question,
      explanation: QuizTable.explanation,
      isPublished: QuizTable.isPublished,
      createdAt: QuizTable.createdAt,

      select_correctChoicesText: SelectQuizTable.correctChoicesText,
      select_incorrectChoicesText: SelectQuizTable.incorrectChoicesText,
      text_answer: TextQuizTable.answer,
      true_false_answer: TrueFalseQuizTable.answer,
    })
    .from(QuizTable)
    .leftJoin(SelectQuizTable, eq(QuizTable.id, SelectQuizTable.quizId))
    .leftJoin(TextQuizTable, eq(QuizTable.id, TextQuizTable.quizId))
    .leftJoin(TrueFalseQuizTable, eq(QuizTable.id, TrueFalseQuizTable.quizId))
    .orderBy(orderByMap[orderBy])
    .limit(limit);

  return rows.map((row) => parseQuizRow(row));
}

const quizRowParsers = {
  select: (row: any) =>
    SelectQuizSchema.parse({
      ...row,
      correctChoicesText: row.select_correctChoicesText,
      incorrectChoicesText: row.select_incorrectChoicesText,
    }),
  text: (row: any) => TextQuizSchema.parse({ ...row, answer: row.text_answer }),
  true_false: (row: any) =>
    TrueFalseQuizSchema.parse({ ...row, answer: row.true_false_answer }),
} as const;

function parseQuizRow(row: any): QuizData {
  const parser = quizRowParsers[row.type as keyof typeof quizRowParsers];
  if (!parser) throw new Error(`Unknown quiz type: ${row.type}`);
  return parser({
    id: row.id,
    type: row.type,
    question: row.question,
    explanation: row.explanation,
    isPublished: row.isPublished,
    createdAt: row.createdAt,
    ...row,
  });
}
