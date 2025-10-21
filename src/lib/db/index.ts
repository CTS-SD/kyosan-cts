import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@/lib/db/schema";

export const db = drizzle(process.env.DATABASE_URL as string, {
  schema,
  logger: process.env.NODE_ENV !== "production",
});
