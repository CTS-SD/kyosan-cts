import "server-only";
import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { QuizTable } from "@/db/schema";
import { type QuizInput, QuizSchema, type QuizzesCursor } from "@/features/quizzes/types";

const MAX_LIMIT = 100;

/** Escape LIKE/ILIKE wildcards so user input is matched literally. */
function escapeLike(term: string) {
  return term.replace(/[\\%_]/g, (c) => `\\${c}`);
}

export async function getQuizzes(input: {
  cursor: QuizzesCursor;
  limit: number;
  order: "asc" | "desc";
  search?: string;
}) {
  const order = input.order;
  const limit = Math.min(Math.max(input.limit, 1), MAX_LIMIT);
  const cursorId = input.cursor ? Number.parseInt(input.cursor, 10) : undefined;
  const hasCursor = cursorId !== undefined && Number.isFinite(cursorId);
  const term = input.search?.trim();
  const pattern = term ? `%${escapeLike(term)}%` : undefined;

  // Fetch one extra row to detect whether a next page exists.
  const rows = await db.query.QuizTable.findMany({
    where: (t, { and, or, gt, lt, ilike }) => {
      const conds = [];
      if (hasCursor) conds.push(order === "asc" ? gt(t.id, cursorId) : lt(t.id, cursorId));
      if (pattern) {
        // Cast the jsonb params to text so answer/choice content is searchable too.
        conds.push(
          or(ilike(t.question, pattern), ilike(t.explanation, pattern), sql`${t.params}::text ilike ${pattern}`),
        );
      }
      return conds.length ? and(...conds) : undefined;
    },
    orderBy: (t, { asc, desc }) => (order === "asc" ? asc(t.id) : desc(t.id)),
    limit: limit + 1,
  });

  const hasMore = rows.length > limit;
  const page = hasMore ? rows.slice(0, limit) : rows;
  const nextCursor = hasMore ? String(page[page.length - 1].id) : null;

  // Parse each row into the discriminated union (also validates the jsonb payload).
  const items = page.map((row) => QuizSchema.parse(row));

  return { items, nextCursor };
}

export async function getQuizById(id: number) {
  const quiz = await db.query.QuizTable.findFirst({
    where: (t, { eq }) => eq(t.id, id),
  });
  return quiz ? QuizSchema.parse(quiz) : null;
}

/** Random published quizzes for the public Puratto play session. */
export async function getRandomPublishedQuizzes(limit: number) {
  const rows = await db.query.QuizTable.findMany({
    where: (t, { eq }) => eq(t.isPublished, true),
    orderBy: () => sql`random()`,
    limit,
  });
  return rows.map((row) => QuizSchema.parse(row));
}

export async function insertQuiz(input: QuizInput) {
  const [{ id }] = await db
    .insert(QuizTable)
    .values({
      type: input.type,
      question: input.question,
      explanation: input.explanation,
      isPublished: input.isPublished,
      params: input.params,
    })
    .returning({ id: QuizTable.id });
  return { id };
}

export async function updateQuiz(id: number, input: QuizInput) {
  await db
    .update(QuizTable)
    .set({
      type: input.type,
      question: input.question,
      explanation: input.explanation,
      isPublished: input.isPublished,
      params: input.params,
    })
    .where(eq(QuizTable.id, id));
}

export async function deleteQuiz(id: number) {
  await db.delete(QuizTable).where(eq(QuizTable.id, id));
}

/** Total / published / unpublished quiz counts for the admin list header. */
export async function getQuizCounts() {
  const [row] = await db
    .select({
      total: sql<number>`count(*)`.mapWith(Number),
      published: sql<number>`count(*) filter (where ${QuizTable.isPublished})`.mapWith(Number),
    })
    .from(QuizTable);

  return {
    total: row.total,
    published: row.published,
    unpublished: row.total - row.published,
  };
}
