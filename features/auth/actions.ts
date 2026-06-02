"use server";

import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { cache } from "react";
import { auth } from "@/features/auth/server";
import type { Role } from "@/features/auth/types";
import { env } from "@/lib/env";
import { deleteUser, getUserByEmail, updateUserRole } from "@/server/services/users";

export const getUser = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user ?? null;
});

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
