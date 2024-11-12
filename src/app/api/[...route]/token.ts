import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { encryptString } from "@/lib/token";

const PIN = process.env.PIN;
const PIN_SECRET = process.env.PIN_SECRET;

const schemas = {
  $post: z.object({
    pin: z.string().length(6),
  }),
};

const app = new Hono().post(
  "/",
  zValidator("json", schemas.$post),
  async (c) => {
    const { pin } = c.req.valid("json");
    if (pin === PIN) {
      return c.json({
        token: encryptString(
          `${PIN}${Math.random().toString(36).substring(7)}`,
          PIN_SECRET!,
        ),
      });
    }

    return c.json({ message: "Invalid PIN" }, 401);
  },
);

export default app;
