"use server";

import { eq } from "drizzle-orm";
import { db } from "../db";
import { account as AccountTable, user as UserTable } from "../db/schema";
import { signUp } from "./client";
import { auth } from ".";
import { headers } from "next/headers";
import { cache } from "react";

export const getSession = cache(async () =>
  auth.api.getSession({
    headers: await headers(),
  }),
);

export async function getUserById(userId: string) {
  const [user] = await db
    .select()
    .from(UserTable)
    .where(eq(UserTable.id, userId));
  return user;
}

export async function getUserByEmail(email: string) {
  const [user] = await db
    .select()
    .from(UserTable)
    .where(eq(UserTable.email, email));
  return user;
}

export async function updateUserRole(userId: string, role: string) {
  await db.update(UserTable).set({ role }).where(eq(UserTable.id, userId));
}

export async function deleteUser(userId: string) {
  await db.delete(UserTable).where(eq(UserTable.id, userId));
  await db.delete(AccountTable).where(eq(AccountTable.userId, userId));
}

export async function resetMemberPassword({
  newPassword,
}: {
  newPassword: string;
}) {
  const member = await getUserByEmail("cts-member@example.com");

  await deleteUser(member.id);

  const result = await signUp.email({
    name: "スタッフ",
    email: "cts-member@example.com",
    password: newPassword,
  });

  if (result.error) {
    throw new Error(result.error.message);
  }

  const newMember = await getUserById(result.data.user.id);
  await updateUserRole(newMember.id, "member");
}
