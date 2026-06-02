import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { auth } from "@/features/auth/server";
import { saveQuizSession } from "@/server/services/sessions";

const saveSessionSchema = z.object({
  results: z.array(z.object({ quizId: z.number().int(), isCorrect: z.boolean() })),
  startedAt: z.number(),
  finishedAt: z.number(),
});

// Public: anyone playing the Puratto test can save a session. When signed in,
// the session is attributed to the user; otherwise it is anonymous.
export const sessionsRoute = new Hono().post("/", zValidator("json", saveSessionSchema), async (c) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  await saveQuizSession(c.req.valid("json"), session?.user.id ?? null);
  return c.json({ ok: true }, 201);
});
