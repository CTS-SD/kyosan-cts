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
  NotebookPenIcon,
  PartyPopperIcon,
  UsersRoundIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

  const router = useRouter();
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
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/puratto" onClick={handleClickItem}>
                    <NotebookPenIcon />
                    <span>ぷらっとテスト</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/dept" onClick={handleClickItem}>
                    <PartyPopperIcon />
                    <span>配属発表</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link href="/admin/dept" onClick={handleClickItem}>
                        メンバー管理
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild onClick={handleClickItem}>
                      <Link href="/admin/dept/settings">表示設定</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/settings" onClick={handleClickItem}>
                    <CogIcon />
                    <span>設定</span>
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
              <SidebarMenuButton className="h-10">
                <UserAvatar user={user} />
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
