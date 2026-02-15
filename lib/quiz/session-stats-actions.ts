"use server";

import { count, eq, sql } from "drizzle-orm";
import { requireRole } from "../auth/actions";
import { db } from "../db";
import { QuizSessionResultTable, QuizSessionTable, QuizTable } from "../db/schema";

export type SessionSummary = {
  totalSessions: number;
  totalQuestions: number;
  totalCorrect: number;
  avgAccuracyRate: number;
  avgPlayTimeSec: number;
};

export async function getSessionSummary(): Promise<SessionSummary> {
  await requireRole(["admin"]);

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
  await requireRole(["admin"]);

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
  avgAccuracyRate: number;
};

export async function getDailySessionTrend(days = 30): Promise<DailySessionTrend[]> {
  await requireRole(["admin"]);

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

  return rows.map((row) => ({
    date: String(row.date),
    sessionCount: Number(row.sessionCount),
    avgAccuracyRate: Number(Number(row.avgAccuracyRate).toFixed(1)),
  }));
}
