import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { QuizInputSchema } from "@/features/quizzes/types";
import {
  deleteQuiz,
  getQuizById,
  getQuizCounts,
  getQuizTags,
  getQuizzes,
  insertQuiz,
  updateQuiz,
} from "@/server/services/quizzes";
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
        search: z.string().optional(),
        // Comma-separated tag names, AND-matched.
        tags: z.string().optional(),
        // Match only quizzes with no tags (mutually exclusive with `tags`).
        untagged: z.stringbool().optional(),
        status: z.enum(["published", "draft"]).optional(),
      }),
    ),
    async (c) => {
      const { limit, cursor, order, search, tags, untagged, status } = c.req.valid("query");
      const tagList = tags
        ? tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : undefined;
      const result = await getQuizzes({ limit, cursor, order, search, tags: tagList, untagged, status });
      return c.json(result);
    },
  )
  .get("/count", async (c) => {
    return c.json(await getQuizCounts());
  })
  .get("/tags", async (c) => {
    return c.json(await getQuizTags());
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
