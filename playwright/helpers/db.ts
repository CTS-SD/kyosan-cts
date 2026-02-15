import { eq, sql } from "drizzle-orm";
import { auth } from "@/lib/auth/server";
import { db } from "@/lib/db";
import { user as UserTable } from "@/lib/db/schema";
import { env } from "@/lib/env";
import { seedDb } from "../../script/lib/seed";
import { assertTestEnv } from "./assert";

export async function seedTestDb() {
  assertTestEnv();

  await seedDb();

  if (!env.TEST_USER_EMAIL || !env.TEST_USER_PASSWORD) {
    throw new Error("Test user credentials are not set");
  }

  // Create test user
  const { user } = await auth.api.signUpEmail({
    body: {
      name: "Test User",
      email: env.TEST_USER_EMAIL,
      password: env.TEST_USER_PASSWORD,
    },
  });
  await db.update(UserTable).set({ role: "admin" }).where(eq(UserTable.id, user.id));
}

export async function resetTestDb() {
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
