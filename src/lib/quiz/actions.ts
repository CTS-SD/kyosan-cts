"use server";

import { count, desc, eq, ilike, or, SQL, sql } from "drizzle-orm";
import { db } from "../db";
import { QuizTable, SelectQuizTable, TextQuizTable, TrueFalseQuizTable } from "../db/schema";
import { QuizValues, SelectQuizEditorSchema, TextQuizEditorSchema, TrueFalseQuizEditorSchema } from "./editor";
import { getQuizHandler, quizTypeHandlers } from "./handlers";
import { QuizData, SelectQuizSchema, TextQuizSchema, TrueFalseQuizSchema } from "./data";
import { notFound } from "next/navigation";
import { requireRole } from "../auth/actions";

export async function insertQuiz(values: QuizValues) {
  await requireRole(["admin"]);

  const [{ id: quizId }] = await db
    .insert(QuizTable)
    .values({
      type: values.type,
      question: values.question,
      explanation: values.explanation,
      isPublished: values.isPublished,
    })
    .returning({ id: QuizTable.id });

  const handler = getQuizHandler(values.type);
  const payload = handler.buildPayload(quizId, values);
  await db.insert(handler.table).values(payload);

  return quizId;
}

export async function updateQuiz(quizId: number, values: QuizValues) {
  await requireRole(["admin"]);

  await db
    .update(QuizTable)
    .set({
      type: values.type,
      question: values.question,
      explanation: values.explanation,
      isPublished: values.isPublished,
    })
    .where(eq(QuizTable.id, quizId));

  const handler = getQuizHandler(values.type);
  const payload = handler.buildPayload(quizId, values);

  await db.insert(handler.table).values(payload).onConflictDoUpdate({
    target: handler.table.quizId,
    set: payload,
  });
}

export async function deleteQuiz(quizId: number) {
  await requireRole(["admin"]);
  await db.delete(QuizTable).where(eq(QuizTable.id, quizId));
}

export async function getQuizById(id: number) {
  const quiz = await db.query.QuizTable.findFirst({
    where: (t, { eq }) => eq(t.id, id),
  });
  if (!quiz) return notFound();

  const handler = getQuizHandler(quiz.type);
  const [extra] = await db.select().from(handler.table).where(eq(handler.table.quizId, quiz.id));

  return handler.dataSchema.parse({ ...quiz, ...extra });
}

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

export async function getQuizzes({
  limit,
  offset,
  where,
  orderBy,
}: {
  limit: number;
  offset: number;
  where?: SQL;
  orderBy?: SQL;
}) {
  const _limit = limit + 1;
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
    .where(where ?? sql`1 = 1`)
    .orderBy(orderBy ?? desc(QuizTable.id))
    .offset(offset ?? 0)
    .limit(_limit);

  const quizzes = rows.map((row) => parseQuizRow(row));
  const hasMore = rows.length === _limit;
  const nextCursor = hasMore ? offset + limit : null;

  return {
    quizzes: quizzes.slice(0, limit),
    hasMore,
    nextCursor,
  };
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
    case "select": {
      return SelectQuizSchema.parse({
        ...base,
        correctChoices: row.select_correctChoices,
        incorrectChoices: row.select_incorrectChoices,
      });
    }
    case "text": {
      return TextQuizSchema.parse({
        ...base,
        answer: row.text_answer,
      });
    }
    case "true_false": {
      return TrueFalseQuizSchema.parse({
        ...base,
        answer: row.true_false_answer,
      });
    }
    default:
      throw new Error(`Unknown quiz type: ${row.type}`);
  }
}

export async function searchQuizzes(query: string) {
  const likeQuery = `%${query}%`;
  const quizzes = await getQuizzes({
    limit: 1000,
    offset: 0,
    where: or(
      eq(QuizTable.id, parseInt(query) || -1),
      ilike(QuizTable.question, likeQuery),
      ilike(QuizTable.explanation, likeQuery),
    ),
  });
  return quizzes;
}

export async function getQuizListStats() {
  const [row] = await db
    .select({
      publicCount: sql<number>`count(case when ${QuizTable.isPublished} = true then 1 end)`.as("publicCount"),
      privateCount: sql<number>`count(case when ${QuizTable.isPublished} = false then 1 end)`.as("privateCount"),
    })
    .from(QuizTable);

  const publicCount = Number(row.publicCount ?? 0);
  const privateCount = Number(row.privateCount ?? 0);

  return {
    totalCount: publicCount + privateCount,
    publicCount,
    privateCount,
  };
}
