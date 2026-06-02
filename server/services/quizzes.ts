import "server-only";
import { asc, eq, inArray, sql } from "drizzle-orm";
import { db } from "@/db";
import { QuizTable, QuizTagMapTable, QuizTagTable } from "@/db/schema";
import { type QuizInput, QuizSchema, type QuizzesCursor } from "@/features/quizzes/types";

const MAX_LIMIT = 100;

type QuizStatus = "published" | "draft";
type DbTransaction = Parameters<Parameters<typeof db.transaction>[0]>[0];

/** Escape LIKE/ILIKE wildcards so user input is matched literally. */
function escapeLike(term: string) {
  return term.replace(/[\\%_]/g, (c) => `\\${c}`);
}

/** Attach each quiz's tag names (one extra query for the whole page). */
async function withTags<T extends { id: number }>(rows: T[]): Promise<(T & { tags: string[] })[]> {
  if (rows.length === 0) return [];
  const maps = await db
    .select()
    .from(QuizTagMapTable)
    .where(
      inArray(
        QuizTagMapTable.quizId,
        rows.map((r) => r.id),
      ),
    );
  const byId = new Map<number, string[]>();
  for (const m of maps) {
    const arr = byId.get(m.quizId) ?? [];
    arr.push(m.tagName);
    byId.set(m.quizId, arr);
  }
  return rows.map((r) => ({ ...r, tags: (byId.get(r.id) ?? []).sort() }));
}

export async function getQuizzes(input: {
  cursor: QuizzesCursor;
  limit: number;
  order: "asc" | "desc";
  search?: string;
  tags?: string[];
  untagged?: boolean;
  status?: QuizStatus;
}) {
  const order = input.order;
  const limit = Math.min(Math.max(input.limit, 1), MAX_LIMIT);
  const cursorId = input.cursor ? Number.parseInt(input.cursor, 10) : undefined;
  const hasCursor = cursorId !== undefined && Number.isFinite(cursorId);
  const term = input.search?.trim();
  const pattern = term ? `%${escapeLike(term)}%` : undefined;
  const tags = input.tags?.map((t) => t.trim()).filter(Boolean) ?? [];

  // AND tag match: the quiz must be mapped to every selected tag.
  const tagFilter =
    tags.length > 0
      ? db
          .select({ quizId: QuizTagMapTable.quizId })
          .from(QuizTagMapTable)
          .where(inArray(QuizTagMapTable.tagName, tags))
          .groupBy(QuizTagMapTable.quizId)
          .having(sql`count(distinct ${QuizTagMapTable.tagName}) = ${tags.length}`)
      : undefined;

  // Untagged match: the quiz must not appear in the tag map at all.
  // Mutually exclusive with `tags` in the UI, so ignore it when tags are set.
  const untaggedFilter =
    input.untagged && tags.length === 0
      ? db.select({ quizId: QuizTagMapTable.quizId }).from(QuizTagMapTable)
      : undefined;

  // Fetch one extra row to detect whether a next page exists.
  const rows = await db.query.QuizTable.findMany({
    where: (t, { and, or, gt, lt, ilike, eq, inArray, notInArray }) => {
      const conds = [];
      if (hasCursor) conds.push(order === "asc" ? gt(t.id, cursorId) : lt(t.id, cursorId));
      if (pattern) {
        // Cast the jsonb params to text so answer/choice content is searchable too.
        conds.push(
          or(ilike(t.question, pattern), ilike(t.explanation, pattern), sql`${t.params}::text ilike ${pattern}`),
        );
      }
      if (input.status) conds.push(eq(t.isPublished, input.status === "published"));
      if (tagFilter) conds.push(inArray(t.id, tagFilter));
      if (untaggedFilter) conds.push(notInArray(t.id, untaggedFilter));
      return conds.length ? and(...conds) : undefined;
    },
    orderBy: (t, { asc, desc }) => (order === "asc" ? asc(t.id) : desc(t.id)),
    limit: limit + 1,
  });

  const hasMore = rows.length > limit;
  const page = hasMore ? rows.slice(0, limit) : rows;
  const nextCursor = hasMore ? String(page[page.length - 1].id) : null;

  // Parse each row into the discriminated union (also validates the jsonb payload).
  const items = (await withTags(page)).map((row) => QuizSchema.parse(row));

  return { items, nextCursor };
}

/** Distinct tag names currently applied to at least one quiz, sorted. */
export async function getQuizTags() {
  const rows = await db
    .selectDistinct({ name: QuizTagMapTable.tagName })
    .from(QuizTagMapTable)
    .orderBy(asc(QuizTagMapTable.tagName));
  return rows.map((r) => r.name);
}

/** Replace a quiz's tag set: upsert tag dictionary rows, then rewrite its mappings. */
async function setQuizTags(tx: DbTransaction, quizId: number, tags: string[]) {
  await tx.delete(QuizTagMapTable).where(eq(QuizTagMapTable.quizId, quizId));
  const clean = Array.from(new Set(tags.map((t) => t.trim()).filter(Boolean)));
  if (clean.length === 0) return;
  await tx
    .insert(QuizTagTable)
    .values(clean.map((name) => ({ name })))
    .onConflictDoNothing();
  await tx.insert(QuizTagMapTable).values(clean.map((name) => ({ quizId, tagName: name })));
}

export async function getQuizById(id: number) {
  const quiz = await db.query.QuizTable.findFirst({
    where: (t, { eq }) => eq(t.id, id),
  });
  if (!quiz) return null;
  const [tagged] = await withTags([quiz]);
  return QuizSchema.parse(tagged);
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
  return db.transaction(async (tx) => {
    const [{ id }] = await tx
      .insert(QuizTable)
      .values({
        type: input.type,
        question: input.question,
        explanation: input.explanation,
        isPublished: input.isPublished,
        params: input.params,
      })
      .returning({ id: QuizTable.id });
    await setQuizTags(tx, id, input.tags);
    return { id };
  });
}

export async function updateQuiz(id: number, input: QuizInput) {
  await db.transaction(async (tx) => {
    await tx
      .update(QuizTable)
      .set({
        type: input.type,
        question: input.question,
        explanation: input.explanation,
        isPublished: input.isPublished,
        params: input.params,
      })
      .where(eq(QuizTable.id, id));
    await setQuizTags(tx, id, input.tags);
  });
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
