import { db } from "@/db/db";
import { gameModes, Quiz } from "@/db/schema";
import { Hono } from "hono";
import { sql } from "drizzle-orm";

const app = new Hono().get("/", async (c) => {
  const gameMode = (await db.select().from(gameModes).limit(1))[0];

  const randomQuizzes = (await db.execute(
    sql`SELECT * FROM quiz WHERE is_public = true ORDER BY RANDOM() LIMIT ${gameMode.quizNum};`,
  )) as Quiz[];

  return c.json({
    quizzes: randomQuizzes,
    passingScore: gameMode.passingScore,
  });
});

export default app;
