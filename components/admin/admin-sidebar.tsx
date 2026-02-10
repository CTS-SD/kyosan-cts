"use client";

import {
  BookUserIcon,
  CogIcon,
  DotIcon,
  EllipsisIcon,
  MessageCircleQuestionIcon,
  NotebookPenIcon,
  Settings2Icon,
  SettingsIcon,
  SquareUserIcon,
  User2Icon,
} from "lucide-react";
import Link from "next/link";
import { Dialog } from "radix-ui";
import { useEffect } from "react";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/components/ui/sidebar";
import { useAdminSidebar } from "../../hooks/use-admin-sidebar";
import { cn } from "../../lib/utils";
import { AdminUserMenu } from "./admin-user-menu";

export const AdminSidebarContent = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div className={cn("flex w-full flex-col", className)} {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2 p-2">
            <Link href="/" className="font-accent font-semibold text-sm">
              京産キャンスタ
            </Link>
            <Link href="/admin/puratto" className="font-medium text-sky-600 text-sm">
              管理者
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>ぷらっとテスト</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/puratto">
                    <NotebookPenIcon />
                    問題管理
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/puratto/settings">
                    <Settings2Icon />
                    出題設定
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>配属発表</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/dept">
                    <SquareUserIcon />
                    メンバー管理
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/dept/settings">
                    <Settings2Icon />
                    表示設定
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>その他</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/settings">
                    <SettingsIcon />
                    設定
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <AdminUserMenu>
              <SidebarMenuButton>
                <User2Icon />
              </SidebarMenuButton>
            </AdminUserMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </div>
  );
};

export const FixedAdminSidebar = () => {
  return (
    <div className="sticky top-0 hidden h-dvh w-64 shrink-0 border-e bg-background px-1.5 lg:flex">
      <AdminSidebarContent />
    </div>
  );
};

export const FloatingAdminSidebar = () => {
  const { open, setOpen } = useAdminSidebar();

  useEffect(() => {
    if (!open) return;

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [open, setOpen]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:fade-in data-[state=closed]:fade-out fixed inset-0 z-50 bg-black/20 backdrop-blur-xs duration-300 data-[state=closed]:animate-out data-[state=open]:animate-in" />
        <Dialog.Content asChild>
          <div className="data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left fixed top-0 left-0 z-50 flex h-dvh w-70 shrink-0 flex-col p-2 duration-300 ease-gentle ease-out data-[state=closed]:animate-out data-[state=open]:animate-in">
            <Dialog.Title className="sr-only">Sidebar</Dialog.Title>
            <AdminSidebarContent className="grow rounded-2xl border bg-background shadow-xl" />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export const AdminSidebar = () => {
  return (
    <>
      <FixedAdminSidebar />
      <FloatingAdminSidebar />
    </>
  );
};
