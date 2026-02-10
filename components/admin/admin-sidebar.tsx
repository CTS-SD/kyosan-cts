"use client";

import type { LucideIcon } from "lucide-react";
import { NotebookPenIcon, Settings2Icon, SettingsIcon, SquareUserIcon, User2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { LogoText } from "../logo-text";
import { AdminUserMenu } from "./admin-user-menu";

type NavItem = {
  icon: LucideIcon;
  title: string;
  url: string;
};

type NavGroup = {
  label: string;
  items: NavItem[];
};

const navGroups: NavGroup[] = [
  {
    label: "ぷらっとテスト",
    items: [
      { icon: NotebookPenIcon, title: "問題管理", url: "/admin/puratto" },
      { icon: Settings2Icon, title: "出題設定", url: "/admin/puratto/settings" },
    ],
  },
  {
    label: "配属発表",
    items: [
      { icon: SquareUserIcon, title: "メンバー管理", url: "/admin/dept" },
      { icon: Settings2Icon, title: "表示設定", url: "/admin/dept/settings" },
    ],
  },
  {
    label: "その他",
    items: [{ icon: SettingsIcon, title: "設定", url: "/admin/settings" }],
  },
];

export const AdminSidebarContent = ({ className, ...props }: React.ComponentProps<"div">) => {
  const { setOpen } = useAdminSidebar();
  const pathname = usePathname();

  return (
    <div className={cn("flex w-full flex-col", className)} {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2 p-2">
            <Link href="/" className="font-accent font-semibold text-sm">
              <LogoText />
            </Link>
            <Link href="/admin/puratto" className="font-accent font-semibold text-muted-foreground text-xs">
              管理者
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {navGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.url} onClick={() => setOpen(false)}>
                    <SidebarMenuButton isActive={item.url === pathname} asChild>
                      <Link href={item.url}>
                        <item.icon />
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
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
