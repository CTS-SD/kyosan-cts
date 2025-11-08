"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSessionPromise } from "@/ctx/session-promise";
import { signOut } from "@/lib/auth/client";
import { LogOutIcon } from "lucide-react";
import { use } from "react";
import { ThemeSubmenu } from "../theme-submenu";
import { Button } from "../ui/button";
import { UserAvatar } from "../user-avatar";

export const MemberUserButton = () => {
  const session = use(useSessionPromise());
  const user = session?.user;
  if (!user) return null;

  const handleSignOut = async () => {
    await signOut({
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
        <Button
          className="size-8 rounded-full"
          size="icon"
          variant="ghost"
          aria-label="ユーザーメニューを開く"
        >
          <UserAvatar user={user} />
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
