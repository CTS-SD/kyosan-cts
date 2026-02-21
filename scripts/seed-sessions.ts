import { addMinutes, addSeconds, setHours, startOfDay, subDays } from "date-fns";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { QuizSessionResultTable, QuizSessionTable, QuizTable } from "@/lib/db/schema";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export async function seedSessions() {
  await db.delete(QuizSessionResultTable).execute();
  await db.delete(QuizSessionTable).execute();

  const quizzes = await db.select({ id: QuizTable.id }).from(QuizTable).where(eq(QuizTable.isPublished, true));

  const quizIds = quizzes.map((q) => q.id);

  if (quizIds.length === 0) {
    console.error("No published quizzes found. Seed quizzes first.");
    process.exit(1);
  }

  console.log(`Found ${quizIds.length} published quizzes: [${quizIds.join(", ")}]`);

  const today = startOfDay(new Date());

  const sessions: {
    totalCount: number;
    correctCount: number;
    startedAt: Date;
    finishedAt: Date;
    createdAt: Date;
    results: { quizId: number; isCorrect: boolean }[];
  }[] = [];

  for (let i = 0; i < 150; i++) {
    // Spread across last 14 days
    const daysAgo = randomInt(1, 90);
    const day = subDays(today, daysAgo);

    // Random time of day between 9:00-21:00
    const hour = randomInt(9, 21);
    const minute = randomInt(0, 59);
    const sessionStart = addMinutes(setHours(day, hour), minute);

    // Play duration: 10s-90s
    const durationSec = randomInt(30, 120);
    const sessionEnd = addSeconds(sessionStart, durationSec);

    // createdAt = right after finishedAt (simulating save on finish)
    const createdAt = addSeconds(sessionEnd, 1);

    // Pick random subset of quizzes (2 to min(6, all))
    const maxPick = Math.min(quizIds.length, 6);
    const count = randomInt(2, maxPick);
    const picked = shuffle(quizIds).slice(0, count);

    const results = picked.map((quizId) => ({
      quizId,
      isCorrect: Math.random() > 0.35,
    }));

    const correctCount = results.filter((r) => r.isCorrect).length;

    sessions.push({
      totalCount: results.length,
      correctCount,
      startedAt: sessionStart,
      finishedAt: sessionEnd,
      createdAt,
      results,
    });
  }

  // Sort by date for readable output
  sessions.sort((a, b) => a.startedAt.getTime() - b.startedAt.getTime());

  let inserted = 0;
  for (const session of sessions) {
    await db.transaction(async (tx) => {
      const [{ id: sessionId }] = await tx
        .insert(QuizSessionTable)
        .values({
          userId: null,
          totalCount: session.totalCount,
          correctCount: session.correctCount,
          startedAt: session.startedAt,
          finishedAt: session.finishedAt,
          createdAt: session.createdAt,
        })
        .returning({ id: QuizSessionTable.id });

      await tx.insert(QuizSessionResultTable).values(
        session.results.map((r) => ({
          sessionId,
          quizId: r.quizId,
          isCorrect: r.isCorrect,
        })),
      );

      inserted++;
    });

    console.log(
      `  Session: ${session.startedAt.toISOString()} | ${session.correctCount}/${session.totalCount} correct`,
    );
  }

  console.log(`\nInserted ${inserted} mock quiz sessions with results.`);
}
