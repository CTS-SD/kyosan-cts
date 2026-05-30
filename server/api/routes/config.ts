import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { type ConfigKey, configDefinitions } from "@/features/config/definitions";
import { upsertConfigValue } from "@/server/services/config";
import { type AuthVariables, requireAdmin } from "../middleware";

export const configRoute = new Hono<{ Variables: AuthVariables }>().put(
  "/",
  requireAdmin,
  zValidator("json", z.object({ key: z.string(), value: z.unknown() })),
  async (c) => {
    const { key, value } = c.req.valid("json");

    if (!(key in configDefinitions)) {
      return c.json({ error: "Unknown config key" }, 400);
    }
    const typedKey = key as ConfigKey;
    const parsed = configDefinitions[typedKey].schema.safeParse(value);
    if (!parsed.success) {
      return c.json({ error: "Invalid config value" }, 400);
    }

    await upsertConfigValue(typedKey, parsed.data);
    return c.json({ ok: true });
  },
);
