"use server";

import { count, desc, eq, sql } from "drizzle-orm";
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
import { notFound } from "next/navigation";

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

export async function deleteQuiz(quizId: number) {
  await db.delete(QuizTable).where(eq(QuizTable.id, quizId));
}

export async function getQuizById(id: number) {
  const quiz = await db.query.QuizTable.findFirst({
    where: (t, { eq }) => eq(t.id, id),
  });
  if (!quiz) return notFound();

  const handler = quizTypeHandlers[quiz.type];
  const [extra] = await db
    .select()
    .from(handler.table)
    .where(eq(handler.table.quizId, quiz.id));

  return handler.dataSchema.parse({ ...quiz, ...extra });
}

const quizOrderByMap = {
  random: sql`random()`,
  created_at_desc: desc(QuizTable.createdAt),
  id_desc: desc(QuizTable.id),
};

type QuizRow = {
  id: number;
  type: QuizData["type"];
  question: string;
  explanation: string | null;
  isPublished: boolean;
  createdAt: Date;
  select_correctChoices: string[] | null;
  select_incorrectChoices: string[] | null;
  text_answer: string | null;
  true_false_answer: boolean | null;
};

export async function getQuizzes(
  {
    limit,
    offset,
    orderBy,
  }: {
    limit: number;
    offset?: number;
    orderBy: keyof typeof quizOrderByMap;
  } = {
    limit: 24,
    offset: 0,
    orderBy: "id_desc",
  },
) {
  const rows: QuizRow[] = await db
    .select({
      id: QuizTable.id,
      type: QuizTable.type,
      question: QuizTable.question,
      explanation: QuizTable.explanation,
      isPublished: QuizTable.isPublished,
      createdAt: QuizTable.createdAt,

      select_correctChoices: SelectQuizTable.correctChoices,
      select_incorrectChoices: SelectQuizTable.incorrectChoices,
      text_answer: TextQuizTable.answer,
      true_false_answer: TrueFalseQuizTable.answer,
    })
    .from(QuizTable)
    .leftJoin(SelectQuizTable, eq(QuizTable.id, SelectQuizTable.quizId))
    .leftJoin(TextQuizTable, eq(QuizTable.id, TextQuizTable.quizId))
    .leftJoin(TrueFalseQuizTable, eq(QuizTable.id, TrueFalseQuizTable.quizId))
    .orderBy(quizOrderByMap[orderBy])
    .offset(offset ?? 0)
    .limit(limit);

  return rows.map((row) => parseQuizRow(row));
}

function parseQuizRow(row: QuizRow): QuizData {
  const base = {
    id: row.id,
    type: row.type,
    question: row.question,
    explanation: row.explanation,
    isPublished: row.isPublished,
    createdAt: row.createdAt,
  };

  switch (row.type) {
    case "select":
      return SelectQuizSchema.parse({
        ...base,
        correctChoices: row.select_correctChoices,
        incorrectChoices: row.select_incorrectChoices,
      });
    case "text":
      return TextQuizSchema.parse({
        ...base,
        answer: row.text_answer,
      });
    case "true_false":
      return TrueFalseQuizSchema.parse({
        ...base,
        answer: row.true_false_answer,
      });
    default:
      throw new Error(`Unknown quiz type: ${row.type}`);
  }
}

export async function getQuizzesCount() {
  const [{ total }] = await db.select({ total: count() }).from(QuizTable);
  return Number(total ?? 0);
}
