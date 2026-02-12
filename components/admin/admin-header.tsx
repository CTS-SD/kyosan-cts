"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { useAdminSidebar } from "../../hooks/use-admin-sidebar";
import { LogoText } from "../logo-text";
import { Button } from "../ui/button";
import { UserAvatar } from "../user-avatar";
import { AdminUserMenu } from "./admin-user-menu";

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
