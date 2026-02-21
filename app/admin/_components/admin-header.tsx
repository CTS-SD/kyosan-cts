"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { LogoText } from "@/components/blocks/logo-text";
import { Button } from "@/components/ui/button";
import { AdminUserMenu } from "@/features/auth/components/admin-user-menu";
import { UserAvatar } from "@/features/auth/components/user-avatar";
import { useAdminSidebar } from "./admin-sidebar";

export const AdminHeader = () => {
  const { setOpen } = useAdminSidebar();

  return (
    <div className="pointer-events-none fixed top-0 right-0 left-0 z-50 px-6 pt-2 lg:hidden">
      <div className="pointer-events-auto mx-auto flex h-12 max-w-lg items-center gap-2 rounded-full border bg-background px-1.25 shadow-xs">
        <Button
          size="icon"
          className="rounded-full text-muted-foreground"
          variant="ghost"
          onClick={() => setOpen(true)}
        >
          <MenuIcon strokeWidth={2.6} className="size-5" />
        </Button>
        <Link href="/" className="">
          <LogoText />
        </Link>
        <div className="ml-auto">
          <AdminUserMenu>
            <UserAvatar className="size-9" />
          </AdminUserMenu>
        </div>
      </div>
    </div>
  );
};
