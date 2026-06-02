import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { ConfigTable, user as UserTable } from "@/db/schema";
import { auth } from "@/features/auth/server";
import type { ConfigKey, ConfigValue } from "@/features/config/definitions";
import { env } from "@/lib/env";
import { seedDb } from "@/scripts/seed";
import { assertTestEnv } from "./assert";

/** Truncate every table, then reseed reference data + the two test accounts. */
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

export async function seedTestDb() {
  assertTestEnv();

  if (!env.TEST_USER_EMAIL || !env.TEST_USER_PASSWORD) {
    throw new Error("Test user credentials are not set");
  }

  await seedDb();

  // Admin account (Google-OAuth users in prod; email+password here for tests).
  const { user: admin } = await auth.api.signUpEmail({
    body: {
      name: "Test Admin",
      email: env.TEST_USER_EMAIL,
      password: env.TEST_USER_PASSWORD,
    },
  });
  await db.update(UserTable).set({ role: "admin" }).where(eq(UserTable.id, admin.id));

  // Shared member account (the single staff login). Same password for tests.
  const { user: member } = await auth.api.signUpEmail({
    body: {
      name: "Test Member",
      email: env.NEXT_PUBLIC_MEMBER_EMAIL,
      password: env.TEST_USER_PASSWORD,
    },
  });
  await db.update(UserTable).set({ role: "member" }).where(eq(UserTable.id, member.id));
}

/**
 * Write a config value straight to the DB for a test.
 * Pages that gate on config (`members` layouts) read it uncached via
 * `getConfigValue`, so a direct write is visible on the next request.
 */
export async function setTestConfig<K extends ConfigKey>(key: K, value: ConfigValue<K>) {
  assertTestEnv();

  await db.insert(ConfigTable).values({ key, value }).onConflictDoUpdate({ target: ConfigTable.key, set: { value } });
}
