import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { assertTestEnv } from "./assert";

export async function resetDb() {
  assertTestEnv();

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
        EXECUTE
          'TRUNCATE TABLE '
          || quote_ident(r.tablename)
          || ' RESTART IDENTITY CASCADE;';
      END LOOP;
    END $$;
  `);
}
