import { db } from "../../../../db/db";
import { Quiz, QuizTypeEnum, quizzes } from "../../../../db/schema";
import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { eq, desc, sql } from "drizzle-orm";
import dayjs from "dayjs";
import { NextResponse } from "next/server";

const schemas = {
  $get: z.object({
    limit: z.string().transform(Number),
    offset: z.string().transform(Number),
  }),
  $post: z.object({
    type: z.nativeEnum(QuizTypeEnum),
    question: z.string(),
    answer: z.string(),
    explanation: z.string().optional(),
    fakes: z.array(z.string()).optional(),
    isPublic: z.boolean().optional(),
  }),
  ":id": {
    $put: z.object({
      type: z.nativeEnum(QuizTypeEnum).optional(),
      question: z.string().optional(),
      answer: z.string().optional(),
      explanation: z.string().optional(),
      fakes: z.array(z.string()).optional(),
      isPublic: z.boolean().optional(),
    }),
  },
  import: {
    $post: z.object({
      file: z.any().transform((file) => file as File),
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
          explanation: body.explanation,
          fakes: body.fakes,
          isPublic: body.isPublic,
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
          explanation: body.explanation,
          fakes: body.fakes,
          isPublic: body.isPublic,
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
  })
  .get("/export", async () => {
    const content = await db.select().from(quizzes);
    const headers = new Headers({
      "Content-Disposition": `attachment; filename=puratto-test-${dayjs().format("YYYYMMDDHHmmss")}.json`,
    });

    return new NextResponse(JSON.stringify(content), { headers });
  })
  .post("/import", zValidator("form", schemas.import.$post), async (c) => {
    const { file } = c.req.valid("form");

    const newQuizzes = JSON.parse(await file.text()) as Quiz[];
    const existingQuizzes = await db.select().from(quizzes);
    const existingQuizIds = existingQuizzes.map((q) => q.id);

    const newQuizValues = newQuizzes.filter(
      (q) => !existingQuizIds.includes(q.id),
    );
    const updateQuizValues = newQuizzes.filter((q) =>
      existingQuizIds.includes(q.id),
    );

    const createdQuizzes =
      newQuizValues.length === 0
        ? []
        : await db.insert(quizzes).values(newQuizValues).returning();

    const updatedQuizzes = await Promise.all(
      updateQuizValues.map(async (q) => {
        const updatedQuiz = (
          await db
            .update(quizzes)
            .set({
              question: q.question,
              type: q.type,
              answer: q.answer,
              explanation: q.explanation,
              fakes: q.fakes,
              isPublic: q.isPublic,
              updatedAt: sql`NOW()`,
            })
            .where(eq(quizzes.id, q.id))
            .returning()
        )[0];

        return updatedQuiz;
      }),
    );

    return c.json({
      createdNum: createdQuizzes.length,
      updatedNum: updatedQuizzes.length,
    });
  });

export default app;
