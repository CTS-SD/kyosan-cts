import "server-only";
import { count, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { QuizSessionResultTable, QuizSessionTable, QuizTable } from "@/db/schema";

export type SaveQuizSessionInput = {
  results: { quizId: number; isCorrect: boolean }[];
  startedAt: number;
  finishedAt: number;
};

/** Persist a completed play session. `userId` is attached when the player is signed in. */
export async function saveQuizSession(input: SaveQuizSessionInput, userId: string | null) {
  const totalCount = input.results.length;
  const correctCount = input.results.filter((r) => r.isCorrect).length;

  await db.transaction(async (tx) => {
    const [session] = await tx
      .insert(QuizSessionTable)
      .values({
        userId,
        totalCount,
        correctCount,
        startedAt: new Date(input.startedAt),
        finishedAt: new Date(input.finishedAt),
      })
      .returning({ id: QuizSessionTable.id });

    if (input.results.length > 0) {
      await tx.insert(QuizSessionResultTable).values(
        input.results.map((r) => ({
          sessionId: session.id,
          quizId: r.quizId,
          isCorrect: r.isCorrect,
        })),
      );
    }
  });
}

export type SessionSummary = {
  totalSessions: number;
  totalQuestions: number;
  totalCorrect: number;
  avgAccuracyRate: number;
  avgPlayTimeSec: number;
};

export async function getSessionSummary(): Promise<SessionSummary> {
  const [row] = await db
    .select({
      totalSessions: count().as("total_sessions"),
      totalQuestions: sql<number>`coalesce(sum(${QuizSessionTable.totalCount}), 0)`.as("total_questions"),
      totalCorrect: sql<number>`coalesce(sum(${QuizSessionTable.correctCount}), 0)`.as("total_correct"),
      avgAccuracyRate:
        sql<number>`coalesce(avg(${QuizSessionTable.correctCount}::float / nullif(${QuizSessionTable.totalCount}, 0) * 100), 0)`.as(
          "avg_accuracy_rate",
        ),
      avgPlayTimeSec:
        sql<number>`coalesce(avg(extract(epoch from ${QuizSessionTable.finishedAt} - ${QuizSessionTable.startedAt})), 0)`.as(
          "avg_play_time_sec",
        ),
    })
    .from(QuizSessionTable);

  return {
    totalSessions: Number(row.totalSessions),
    totalQuestions: Number(row.totalQuestions),
    totalCorrect: Number(row.totalCorrect),
    avgAccuracyRate: Number(Number(row.avgAccuracyRate).toFixed(1)),
    avgPlayTimeSec: Math.round(Number(row.avgPlayTimeSec)),
  };
}

export type PerQuizAccuracy = {
  quizId: number;
  question: string;
  type: string;
  totalAttempts: number;
  correctCount: number;
  accuracyRate: number;
};

export async function getPerQuizAccuracy(): Promise<PerQuizAccuracy[]> {
  const rows = await db
    .select({
      quizId: QuizSessionResultTable.quizId,
      question: QuizTable.question,
      type: QuizTable.type,
      totalAttempts: count().as("total_attempts"),
      correctCount: sql<number>`count(case when ${QuizSessionResultTable.isCorrect} = true then 1 end)`.as(
        "correct_count",
      ),
    })
    .from(QuizSessionResultTable)
    .innerJoin(QuizTable, eq(QuizSessionResultTable.quizId, QuizTable.id))
    .groupBy(QuizSessionResultTable.quizId, QuizTable.question, QuizTable.type)
    .orderBy(
      sql`count(case when ${QuizSessionResultTable.isCorrect} = true then 1 end)::float / nullif(count(*), 0) asc`,
    );

  return rows.map((row) => {
    const totalAttempts = Number(row.totalAttempts);
    const correctCount = Number(row.correctCount);
    return {
      quizId: row.quizId,
      question: row.question,
      type: row.type,
      totalAttempts,
      correctCount,
      accuracyRate: totalAttempts > 0 ? Number(((correctCount / totalAttempts) * 100).toFixed(1)) : 0,
    };
  });
}

export type DailySessionTrend = {
  date: string;
  sessionCount: number;
  avgAccuracyRate: number | null;
};

export async function getDailySessionTrend(days = 30): Promise<DailySessionTrend[]> {
  const rows = await db
    .select({
      date: sql<string>`date_trunc('day', ${QuizSessionTable.createdAt})::date`.as("date"),
      sessionCount: count().as("session_count"),
      avgAccuracyRate:
        sql<number>`coalesce(avg(${QuizSessionTable.correctCount}::float / nullif(${QuizSessionTable.totalCount}, 0) * 100), 0)`.as(
          "avg_accuracy_rate",
        ),
    })
    .from(QuizSessionTable)
    .where(sql`${QuizSessionTable.createdAt} >= now() - interval '1 day' * ${days}`)
    .groupBy(sql`date_trunc('day', ${QuizSessionTable.createdAt})::date`)
    .orderBy(sql`date_trunc('day', ${QuizSessionTable.createdAt})::date asc`);

  // Normalize to "YYYY-MM-DD" regardless of what node-postgres returns (string or Date)
  const toDateStr = (v: unknown) => {
    const s = String(v);
    return /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : new Date(s).toISOString().split("T")[0];
  };

  const dataMap = new Map(rows.map((row) => [toDateStr(row.date), row]));

  // Fill in all days in the range, including days with 0 sessions
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  return Array.from({ length: days }, (_, i) => {
    const dateStr = new Date(today.getTime() - (days - 1 - i) * 86400000).toISOString().split("T")[0];
    const row = dataMap.get(dateStr);
    return {
      date: dateStr,
      sessionCount: row ? Number(row.sessionCount) : 0,
      avgAccuracyRate: row ? Number(Number(row.avgAccuracyRate).toFixed(1)) : null,
    };
  });
}
