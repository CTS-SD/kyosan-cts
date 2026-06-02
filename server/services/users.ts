import "server-only";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { account as AccountTable, user as UserTable } from "@/db/schema";

export async function getUserByEmail(email: string) {
  return db.query.user.findFirst({
    where: (user, { eq }) => eq(user.email, email),
  });
}

export async function updateUserRole(userId: string, role: string) {
  await db.update(UserTable).set({ role }).where(eq(UserTable.id, userId));
}

export async function deleteUser(userId: string) {
  await db.delete(UserTable).where(eq(UserTable.id, userId));
  await db.delete(AccountTable).where(eq(AccountTable.userId, userId));
}
