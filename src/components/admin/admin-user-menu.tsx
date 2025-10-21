"use client";

import {
  Menu,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import { useSessionPromise } from "@/ctx/session-promise";
import { signOut } from "@/lib/auth-client";
import { HomeIcon, LogOutIcon, ShieldCheckIcon } from "lucide-react";
import Link from "next/link";
import { use } from "react";

export const AdminUserMenu = (
  props: React.ComponentProps<typeof MenuTrigger>,
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
    <Menu>
      <MenuTrigger asChild {...props} />
      <MenuPopup align="end" className="min-w-40">
        <MenuItem asChild>
          <Link href="/">
            <HomeIcon />
            ホーム
          </Link>
        </MenuItem>
        <MenuItem asChild>
          <Link href="/admin/puratto">
            <ShieldCheckIcon />
            管理者ページ
          </Link>
        </MenuItem>
        <MenuSeparator />
        <MenuItem onClick={handleSignOut} variant="destructive">
          <LogOutIcon />
          ログアウト
        </MenuItem>
      </MenuPopup>
    </Menu>
  );
};
