import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { reset } from "drizzle-seed";
import { Client } from "pg";
import { auth } from "@/lib/auth";
import * as schema from "@/lib/db/schema";
import { user as UserTable } from "@/lib/db/schema";
import { seeding } from "./lib/seed";

main().catch((err) => {
  console.error("Failed to reset test database:", err);
  process.exit(1);
});

async function main() {
  if (!["test", "development"].includes(process.env.NODE_ENV)) {
    throw new Error("This script can only be run in test environment");
  }

  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  if (!connectionString.endsWith("/test") && !connectionString.endsWith("/dev")) {
    throw new Error('DATABASE_URL must point to the "test" database to prevent data loss');
  }

  const client = new Client({ connectionString });
  await client.connect();
  const db = drizzle(client, { schema });

  await reset(db, schema);

  console.log("Database reset completed.");

  if (process.env.NODE_ENV === "test") {
    // Create test user
    const { user } = await auth.api.signUpEmail({
      body: {
        name: "Test User",
        email: process.env.TEST_USER_EMAIL!,
        password: process.env.TEST_USER_PASSWORD!,
      },
    });
    await db.update(UserTable).set({ role: "admin" }).where(eq(UserTable.id, user.id));
  }

  await seeding();
  await client.end();

  console.log("Seeding completed.");
  process.exit(0);
}
