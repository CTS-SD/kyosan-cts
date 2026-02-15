"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { cache } from "react";
import { db } from "../db";
import { account as AccountTable, user as UserTable } from "../db/schema";
import { env } from "../env";
import { authClient } from "./client";
import { auth } from "./server";
import type { Role } from "./types";

export const getUser = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user ?? null;
});

export async function getUserById(userId: string) {
  await requireRole(["admin"]);
  const [user] = await db.select().from(UserTable).where(eq(UserTable.id, userId));
  return user;
}

export async function getUserByEmail(email: string) {
  await requireRole(["admin"]);
  const [user] = await db.select().from(UserTable).where(eq(UserTable.email, email));
  return user;
}

export async function updateUserRole(userId: string, role: string) {
  await requireRole(["admin"]);
  await db.update(UserTable).set({ role }).where(eq(UserTable.id, userId));
}

export async function deleteUser(userId: string) {
  await requireRole(["admin"]);
  await db.delete(UserTable).where(eq(UserTable.id, userId));
  await db.delete(AccountTable).where(eq(AccountTable.userId, userId));
}

export async function resetMemberPassword({ newPassword }: { newPassword: string }) {
  await requireRole(["admin"]);

  const member = await getUserByEmail(env.NEXT_PUBLIC_MEMBER_EMAIL);

  if (member) {
    await deleteUser(member.id);
  }

  const result = await auth.api.signUpEmail({
    body: {
      name: "ｷｬﾝﾊﾟｽﾂｱｰｽﾀｯﾌ",
      email: env.NEXT_PUBLIC_MEMBER_EMAIL,
      password: newPassword,
    },
  });

  await updateUserRole(result.user.id, "member");
}

export async function requireRole(roles: Role[], onReject = () => notFound()) {
  const user = await getUser();
  if (!user || !roles.includes(user.role as Role)) {
    return onReject();
  }
}
