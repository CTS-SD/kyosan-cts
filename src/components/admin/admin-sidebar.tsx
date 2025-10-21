"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useSessionPromise } from "@/ctx/session-promise";
import {
  ChevronsUpDownIcon,
  CogIcon,
  NotebookIcon,
  UsersRoundIcon,
} from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { Badge } from "../ui/badge";
import { UserAvatar } from "../user-avatar";
import { AdminUserMenu } from "./admin-user-menu";

const items = [
  {
    title: "ぷらっとテスト",
    url: "/admin/puratto",
    icon: NotebookIcon,
  },
  {
    title: "配属発表",
    url: "/admin/dept",
    icon: UsersRoundIcon,
    subItems: [
      {
        title: "メンバー管理",
        url: "/admin/dept",
      },
      {
        title: "表示設定",
        url: "/admin/dept/settings",
      },
    ],
  },
  {
    title: "設定",
    url: "/admin/settings",
    icon: CogIcon,
  },
];

export const AdminSidebar = () => {
  const session = use(useSessionPromise());
  const user = session?.user;

  const { setOpenMobile } = useSidebar();

  if (!user) return null;

  const handleClickItem = () => setOpenMobile(false);

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex gap-2 p-2 text-sm">
            <Link href="/" className="font-semibold">
              京産キャンスタ
            </Link>
            <Link href="/admin/puratto">
              <Badge>管理者</Badge>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} onClick={handleClickItem}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.subItems && (
                    <SidebarMenuSub>
                      {item.subItems.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={subItem.url} onClick={handleClickItem}>
                              {subItem.title}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <AdminUserMenu>
              <SidebarMenuButton className="h-10">
                <UserAvatar user={user} className="size-6" />
                <span>{user.name}</span>
                <ChevronsUpDownIcon className="text-muted-foreground ml-auto" />
              </SidebarMenuButton>
            </AdminUserMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
