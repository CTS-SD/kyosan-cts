"use server";

import { getUser } from "@/lib/auth/actions";
import { db } from "@/lib/db";
import { QuizSessionResultTable, QuizSessionTable } from "@/lib/db/schema";

type SaveQuizSessionInput = {
  results: { quizId: number; isCorrect: boolean }[];
  startedAt: number;
  finishedAt: number;
};

export async function saveQuizSession(input: SaveQuizSessionInput) {
  const user = await getUser();

  const totalCount = input.results.length;
  const correctCount = input.results.filter((r) => r.isCorrect).length;

  await db.transaction(async (tx) => {
    const [session] = await tx
      .insert(QuizSessionTable)
      .values({
        userId: user?.id ?? null,
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
