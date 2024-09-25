import { db } from "../../../../db/db";
import { Quiz, QuizTypeEnum, quizzes } from "../../../../db/schema";
import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { eq, sql } from "drizzle-orm";

const schemas = {
  $post: z.object({
    type: z.nativeEnum(QuizTypeEnum),
    question: z.string(),
    answer: z.string(),
    fakes: z.array(z.string()).optional(),
  }),
  ":id": {
    $put: z.object({
      type: z.nativeEnum(QuizTypeEnum).optional(),
      question: z.string().optional(),
      answer: z.string().optional(),
      fakes: z.array(z.string()).optional(),
    }),
  },
};

const app = new Hono()
  .get("/", async (c) => {
    const quizList = await db.select().from(quizzes);
    return c.json(quizList);
  })
  .post("/", zValidator("json", schemas.$post), async (c) => {
    const body = c.req.valid("json");

    const newQuizzes = await db
      .insert(quizzes)
      .values({
        question: body.question,
        type: body.type,
        answer: body.answer,
        fakes: body.fakes,
      })
      .returning();

    return c.json(newQuizzes[0]);
  })
  .put("/:id", zValidator("json", schemas[":id"].$put), async (c) => {
    const body = c.req.valid("json");
    const id = c.req.param("id");

    const updatedQuizzes = await db
      .update(quizzes)
      .set({
        question: body.question,
        type: body.type,
        answer: body.answer,
        fakes: body.fakes,
      })
      .where(eq(quizzes.id, id))
      .returning();

    return c.json(updatedQuizzes[0]);
  });

export default app;
