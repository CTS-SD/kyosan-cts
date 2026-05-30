import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { QuizInputSchema } from "@/features/quizzes/types";
import { deleteQuiz, getQuizById, getQuizCounts, getQuizzes, insertQuiz, updateQuiz } from "@/server/services/quizzes";
import { type AuthVariables, requireAdmin } from "../middleware";

const idParam = z.object({ id: z.coerce.number().int().positive() });

export const quizzesRoute = new Hono<{ Variables: AuthVariables }>()
  .use("*", requireAdmin)
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        cursor: z.string().optional(),
        limit: z.coerce.number().int().positive().max(100),
        order: z.enum(["asc", "desc"]),
      }),
    ),
    async (c) => {
      const { limit, cursor, order } = c.req.valid("query");
      const result = await getQuizzes({ limit, cursor, order });
      return c.json(result);
    },
  )
  .get("/count", async (c) => {
    return c.json(await getQuizCounts());
  })
  .post("/", zValidator("json", QuizInputSchema), async (c) => {
    const input = c.req.valid("json");
    const result = await insertQuiz(input);
    return c.json(result, 201);
  })
  .get("/:id", zValidator("param", idParam), async (c) => {
    const { id } = c.req.valid("param");
    const quiz = await getQuizById(id);
    if (!quiz) {
      return c.json({ error: "Not Found" }, 404);
    }
    return c.json(quiz);
  })
  .put("/:id", zValidator("param", idParam), zValidator("json", QuizInputSchema), async (c) => {
    const { id } = c.req.valid("param");
    const input = c.req.valid("json");
    await updateQuiz(id, input);
    return c.json({ id });
  })
  .delete("/:id", zValidator("param", idParam), async (c) => {
    const { id } = c.req.valid("param");
    await deleteQuiz(id);
    return c.json({ id });
  });
