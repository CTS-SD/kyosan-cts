"use server";

import { and, desc, eq, ilike, inArray, or, type SQL, sql } from "drizzle-orm";
import { notFound } from "next/navigation";
import { requireRole } from "../auth/actions";
import { db } from "../db";
import {
  QuizTable,
  QuizTagMapTable,
  QuizTagTable,
  SelectQuizTable,
  TextQuizTable,
  TrueFalseQuizTable,
} from "../db/schema";
import type { QuizEditorValues } from "./domain/editor";
import { getQuizHandler } from "./domain/handlers";
import type { QuizData } from "./domain/types";

/**
 * Sync quiz tags: upsert tag names and re-create quiz_tag_map entries.
 */
async function syncQuizTags(tx: Parameters<Parameters<typeof db.transaction>[0]>[0], quizId: number, tags: string[]) {
  await tx.delete(QuizTagMapTable).where(eq(QuizTagMapTable.quizId, quizId));

  if (tags.length === 0) return;

  await tx
    .insert(QuizTagTable)
    .values(tags.map((name) => ({ name })))
    .onConflictDoNothing();

  await tx.insert(QuizTagMapTable).values(tags.map((tagName) => ({ quizId, tagName })));
}

export async function insertQuiz(values: QuizEditorValues) {
  await requireRole(["admin"]);

  return await db.transaction(async (tx) => {
    const [{ id: quizId }] = await tx
      .insert(QuizTable)
      .values({
        type: values.type,
        question: values.question,
        explanation: values.explanation,
        isPublished: values.isPublished,
      })
      .returning({ id: QuizTable.id });

    const handler = getQuizHandler(values.type);
    const payload = handler.buildDbPayload(quizId, values as never);
    await tx.insert(handler.table).values(payload);

    await syncQuizTags(tx, quizId, values.tags ?? []);

    return quizId;
  });
}

export async function updateQuiz(quizId: number, values: QuizEditorValues) {
  await requireRole(["admin"]);

  await db.transaction(async (tx) => {
    await tx
      .update(QuizTable)
      .set({
        type: values.type,
        question: values.question,
        explanation: values.explanation,
        isPublished: values.isPublished,
      })
      .where(eq(QuizTable.id, quizId));

    const handler = getQuizHandler(values.type);
    const payload = handler.buildDbPayload(quizId, values as never);

    await tx.insert(handler.table).values(payload).onConflictDoUpdate({
      target: handler.table.quizId,
      set: payload,
    });

    await syncQuizTags(tx, quizId, values.tags ?? []);
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

  const tagRows = await db
    .select({ tagName: QuizTagMapTable.tagName })
    .from(QuizTagMapTable)
    .where(eq(QuizTagMapTable.quizId, quiz.id));
  const tags = tagRows.map((r) => r.tagName);

  return handler.dataSchema.parse({ ...quiz, ...extra, tags });
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

/**
 * Parse a quiz row from the database into QuizData.
 */
function parseQuizRow(row: QuizRow, tags: string[] = []): QuizData {
  const base = {
    id: row.id,
    type: row.type,
    question: row.question,
    explanation: row.explanation,
    isPublished: row.isPublished,
    createdAt: row.createdAt,
    tags,
  };

  const handler = getQuizHandler(row.type);

  // Build the type-specific data
  const typeSpecificData = (() => {
    switch (row.type) {
      case "select":
        return {
          correctChoices: row.select_correctChoices,
          incorrectChoices: row.select_incorrectChoices,
        };
      case "text":
        return { answer: row.text_answer };
      case "true_false":
        return { answer: row.true_false_answer };
    }
  })();

  return handler.dataSchema.parse({ ...base, ...typeSpecificData });
}

/**
 * Get a paginated list of quizzes.
 */
export async function getQuizzes({
  limit,
  offset,
  where,
  orderBy,
  tags,
}: {
  limit: number;
  offset: number;
  where?: SQL;
  orderBy?: SQL;
  tags?: string[];
}) {
  const tagConditions = (tags ?? []).map((tag) =>
    inArray(
      QuizTable.id,
      db.select({ quizId: QuizTagMapTable.quizId }).from(QuizTagMapTable).where(eq(QuizTagMapTable.tagName, tag)),
    ),
  );
  const combinedWhere = tagConditions.length > 0 ? and(where ?? sql`1 = 1`, ...tagConditions) : (where ?? sql`1 = 1`);

  const _limit = limit + 1;
  const rows = await db
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
    .where(combinedWhere)
    .orderBy(orderBy ?? desc(QuizTable.id))
    .offset(offset ?? 0)
    .limit(_limit);

  // Batch-fetch tags for all quiz IDs
  const quizIds = rows.map((r) => r.id);
  const tagRows =
    quizIds.length > 0
      ? await db
          .select({ quizId: QuizTagMapTable.quizId, tagName: QuizTagMapTable.tagName })
          .from(QuizTagMapTable)
          .where(inArray(QuizTagMapTable.quizId, quizIds))
      : [];
  const tagsByQuizId = new Map<number, string[]>();
  for (const row of tagRows) {
    const tags = tagsByQuizId.get(row.quizId) ?? [];
    tags.push(row.tagName);
    tagsByQuizId.set(row.quizId, tags);
  }

  const quizzes = rows.map((row) => parseQuizRow(row, tagsByQuizId.get(row.id) ?? []));
  const hasMore = rows.length === _limit;
  const nextCursor = hasMore ? offset + limit : null;

  return {
    quizzes: quizzes.slice(0, limit),
    hasMore,
    nextCursor,
  };
}

/**
 * Search quizzes by query string.
 */
export async function searchQuizzes(query: string, tags?: string[]) {
  const likeQuery = `%${query}%`;
  const quizzes = await getQuizzes({
    limit: 1000,
    offset: 0,
    tags,
    where: or(
      eq(QuizTable.id, parseInt(query, 10) || -1),
      ilike(QuizTable.question, likeQuery),
      ilike(QuizTable.explanation, likeQuery),
    ),
  });
  return quizzes;
}

/**
 * Get statistics about the quiz list.
 */
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

/**
 * Get all tag names.
 */
export async function getTags() {
  const rows = await db.select({ name: QuizTagTable.name }).from(QuizTagTable).orderBy(QuizTagTable.name);
  return rows.map((r) => r.name);
}
