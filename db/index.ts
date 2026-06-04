import "server-only";
import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "@/lib/env";
import * as schema from "./schema";

export const db = drizzle(env.DATABASE_URL, {
  schema,
  logger: process.env.NODE_ENV === "development",
});
