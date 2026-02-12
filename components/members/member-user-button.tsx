"use client";

import { LogOutIcon } from "lucide-react";
import { authClient } from "@/lib/auth/client";
import { ThemeSubmenu } from "../theme-submenu";
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
        <UserAvatar className="size-9" />
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
