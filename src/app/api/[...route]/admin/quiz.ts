import { db } from "../../../../db/db";
import { QuizTypeEnum, quizzes } from "../../../../db/schema";
import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { eq, desc, sql } from "drizzle-orm";

const schemas = {
  $get: z.object({
    limit: z.string().transform(Number),
    offset: z.string().transform(Number),
  }),
  $post: z.object({
    type: z.nativeEnum(QuizTypeEnum),
    question: z.string(),
    answer: z.string(),
    description: z.string().optional(),
    fakes: z.array(z.string()).optional(),
  }),
  ":id": {
    $put: z.object({
      type: z.nativeEnum(QuizTypeEnum).optional(),
      question: z.string().optional(),
      answer: z.string().optional(),
      description: z.string().optional(),
      fakes: z.array(z.string()).optional(),
    }),
  },
};

const app = new Hono()
  // get quizzes
  .get("/", zValidator("query", schemas.$get), async (c) => {
    const { limit, offset } = c.req.valid("query");
    const quizList = await db
      .select()
      .from(quizzes)
      .offset(offset)
      .limit(limit)
      .orderBy(desc(quizzes.createdAt));
    return c.json(quizList);
  })
  // create a quiz
  .post("/", zValidator("json", schemas.$post), async (c) => {
    const body = c.req.valid("json");

    const newQuiz = (
      await db
        .insert(quizzes)
        .values({
          question: body.question,
          type: body.type,
          answer: body.answer,
          description: body.description,
          fakes: body.fakes,
        })
        .returning()
    )[0];

    return c.json(newQuiz);
  })
  // update a quiz
  .put("/:id", zValidator("json", schemas[":id"].$put), async (c) => {
    const body = c.req.valid("json");
    const id = c.req.param("id");

    const updatedQuiz = (
      await db
        .update(quizzes)
        .set({
          question: body.question,
          type: body.type,
          answer: body.answer,
          description: body.description,
          fakes: body.fakes,
          updatedAt: sql`NOW()`,
        })
        .where(eq(quizzes.id, id))
        .returning()
    )[0];

    return c.json(updatedQuiz);
  })
  // delete a quiz
  .delete("/:id", async (c) => {
    const id = c.req.param("id");

    const deletedQuizId = (
      await db.delete(quizzes).where(eq(quizzes.id, id)).returning({
        id: quizzes.id,
      })
    )[0];

    if (!deletedQuizId) {
      return c.json({ error: "Quiz not found" }, 404);
    }

    return c.json(deletedQuizId);
  });

export default app;
