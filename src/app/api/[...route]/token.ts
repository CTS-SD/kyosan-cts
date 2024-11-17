import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { setCookie } from "hono/cookie";
import { JWTPayload, SignJWT } from "jose";
import { CookieKey } from "@/lib/const";

const PIN = process.env.PIN!;
const PIN_SECRET = process.env.PIN_SECRET!;
const PIN_SECRET_ENCODED = new TextEncoder().encode(PIN_SECRET);

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
      const payload = {
        role: "user",
      };
      const token = await createToken(payload);

      setCookie(c, CookieKey.USER_JWT, token, {
        httpOnly: true,
        secure: true,
      });

      return c.text("OK");
    }

    return c.text("Invalid PIN", 401);
  },
);

async function createToken(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("3d")
    .sign(PIN_SECRET_ENCODED);
}

export default app;
