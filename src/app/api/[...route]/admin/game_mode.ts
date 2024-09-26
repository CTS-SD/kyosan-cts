import { db } from "@/db/db";
import { gameModes } from "@/db/schema";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

const schemas = {
  ":id": {
    $put: z.object({
      name: z.string().optional(),
      quizNum: z.number().optional(),
      passingScore: z.number().optional(),
    }),
  },
};

const app = new Hono()
  .get("/", async (c) => {
    const gameMode = (await db.select().from(gameModes).limit(1))[0];
    return c.json(gameMode);
  })
  .put("/:id", zValidator("json", schemas[":id"].$put), async (c) => {
    const body = c.req.valid("json");
    const id = c.req.param("id");

    const updatedGameMode = await db
      .update(gameModes)
      .set({
        name: body.name,
        quizNum: body.quizNum,
        passingScore: body.passingScore,
      })
      .where(eq(gameModes.id, id))
      .returning();

    return c.json(updatedGameMode[0]);
  });

export default app;
