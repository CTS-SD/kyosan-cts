import { execSync } from "node:child_process";
import { sql } from "drizzle-orm";
import { db } from "../lib/db";

export default async function globalSetup() {
  const DATABASE_URL = process.env.DATABASE_URL;

  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  await db.execute(sql`
    DO $$
    DECLARE
      r RECORD;
    BEGIN
      FOR r IN (
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'public'
      ) LOOP
        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE;';
      END LOOP;
    END $$;
  `);

  execSync("pnpm drizzle-kit migrate", { stdio: "inherit" });
}
