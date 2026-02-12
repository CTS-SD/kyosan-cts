"use client";

import { BadgeCheckIcon, HomeIcon, LayoutGridIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth/client";
import { ThemeSubmenu } from "../theme-submenu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const AdminUserMenu = (props: React.ComponentProps<typeof DropdownMenuTrigger>) => {
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
      <DropdownMenuTrigger asChild {...props} />
      <DropdownMenuContent align="end" className="min-w-40">
        <DropdownMenuLabel className="flex items-center gap-1">
          管理者
          <BadgeCheckIcon className="size-4" />
        </DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href="/admin/puratto">
            <LayoutGridIcon />
            ダッシュボード
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
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
