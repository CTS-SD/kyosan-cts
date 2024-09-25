import { db } from "@/db/db";
import { Quiz } from "@/db/schema";
import { Hono } from "hono";
import { sql } from "drizzle-orm";

const app = new Hono().get("/", async (c) => {
  // return random 10 quizzes
  const randomQuizzes = (await db.execute(
    sql`SELECT * FROM quizzes ORDER BY RANDOM() LIMIT 10;`
  )) as Quiz[];

  return c.json(randomQuizzes);
});

export default app;
