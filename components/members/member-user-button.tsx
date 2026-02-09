"use client";

import { LogOutIcon } from "lucide-react";
import { authClient } from "../../lib/auth/client";
import { ThemeSubmenu } from "../theme-submenu";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { UserAvatar } from "../user-avatar";

export const MemberUserButton = () => {
  const { data: session } = authClient.useSession();
  if (!session?.user) return null;

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-8 rounded-full" size="icon" variant="ghost" aria-label="ユーザーメニューを開く">
          <UserAvatar user={session.user} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <ThemeSubmenu />
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} variant="destructive">
          <LogOutIcon />
          ログアウト
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
