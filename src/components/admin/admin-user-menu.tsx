"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSessionPromise } from "@/ctx/session-promise";
import { signOut } from "@/lib/auth-client";
import { HomeIcon, LogOutIcon, ShieldCheckIcon } from "lucide-react";
import Link from "next/link";
import { use } from "react";

export const AdminUserMenu = (
  props: React.ComponentProps<typeof DropdownMenuTrigger>,
) => {
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
      <DropdownMenuTrigger asChild {...props} />
      <DropdownMenuContent align="end" className="min-w-40">
        <DropdownMenuItem asChild>
          <Link href="/">
            <HomeIcon />
            ホーム
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/admin/puratto">
            <ShieldCheckIcon />
            管理者ページ
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOutIcon />
          ログアウト
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
