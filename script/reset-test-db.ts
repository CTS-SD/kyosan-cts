import { Client } from "pg";
import { auth } from "@/lib/auth";
import { execSync } from "child_process";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { user as UserTable } from "@/lib/db/schema";
import { seed } from "./seed";

reset().catch((err) => {
  console.error("Failed to reset test database:", err);
  process.exit(1);
});

async function reset() {
  if (process.env.NODE_ENV !== "test") {
    throw new Error("This script can only be run in test environment");
  }

  const connectionString = process.env.DATABASE_URL!;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not defined");
  }

  const client = new Client({ connectionString });
  await client.connect();

  // Drop and recreate public schema
  await client.query(`
    DO $$
    BEGIN
      EXECUTE 'DROP SCHEMA public CASCADE';
      EXECUTE 'CREATE SCHEMA public';
      EXECUTE 'GRANT ALL ON SCHEMA public TO postgres';
      EXECUTE 'GRANT ALL ON SCHEMA public TO public';
    END
    $$;
  `);

  await client.end();

  // Run migrations
  execSync("pnpm drizzle-kit push --force");

  // Create test user
  const { user } = await auth.api.signUpEmail({
    body: {
      name: "Test User",
      email: process.env.TEST_USER_EMAIL!,
      password: process.env.TEST_USER_PASSWORD!,
    },
  });
  await db
    .update(UserTable)
    .set({ role: "admin" })
    .where(eq(UserTable.id, user.id));

  await seed();
}
