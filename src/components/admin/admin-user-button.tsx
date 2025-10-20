"use client";

import { useSessionPromise } from "@/ctx/session-promise";
import { use } from "react";
import { Button } from "../ui/button";
import { UserAvatar } from "../user-avatar";
import { AdminUserMenu } from "./admin-user-menu";

export const AdminUserButton = () => {
  const session = use(useSessionPromise());
  const user = session?.user;
  if (!user) return null;

  return (
    <AdminUserMenu>
      <Button
        className="size-8 rounded-full"
        size="icon"
        variant="ghost"
        aria-label="ユーザーメニューを開く"
      >
        <UserAvatar className="size-7" user={user} />
      </Button>
    </AdminUserMenu>
  );
};
