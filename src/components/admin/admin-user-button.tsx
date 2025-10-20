"use client";

import { useSessionPromise } from "@/ctx/session-promise";
import { use } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
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
        variant="outline"
        aria-label="ユーザーメニューを開く"
      >
        <Avatar className="size-6 select-none">
          <AvatarImage src={user.image ?? ""} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </Button>
    </AdminUserMenu>
  );
};
