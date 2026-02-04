import { headers } from "next/headers";
import { auth } from "@/lib/auth/server";
import { Button } from "../ui/button";
import { UserAvatar } from "../user-avatar";
import { AdminUserMenu } from "./admin-user-menu";

export const AdminUserButton = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) return null;

  return (
    <AdminUserMenu>
      <Button className="size-8 rounded-full" size="icon" variant="ghost" aria-label="ユーザーメニューを開く">
        <UserAvatar className="size-7" user={session.user} />
      </Button>
    </AdminUserMenu>
  );
};
