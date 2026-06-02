import { jsonb, pgTable, text } from "drizzle-orm/pg-core";

export const ConfigTable = pgTable("config", {
  key: text("key").primaryKey(),
  value: jsonb("value"),
});
