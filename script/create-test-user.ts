import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user as UserTable } from "@/lib/db/schema/auth";
import { eq } from "drizzle-orm";

const { user } = await auth.api.signUpEmail({
  body: {
    name: "Test User",
    email: process.env.TEST_USER_EMAIL!,
    password: process.env.TEST_USER_PASSWORD!,
  },
});

await db
  .update(UserTable)
  .set({
    role: "admin",
  })
  .where(eq(UserTable.id, user.id));
