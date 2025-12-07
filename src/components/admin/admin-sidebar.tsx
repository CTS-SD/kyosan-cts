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
import { ChevronDownIcon, ChevronRightIcon, CogIcon, NotebookIcon, UsersRoundIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { use } from "react";
import { Badge } from "../ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { UserAvatar } from "../user-avatar";
import { AdminUserMenu } from "./admin-user-menu";

const items = [
  {
    title: "ぷらっとテスト",
    icon: NotebookIcon,
    subItems: [
      {
        title: "問題リスト",
        url: "/admin/puratto",
      },
      {
        title: "出題設定",
        url: "/admin/puratto/settings",
      },
    ],
  },
  {
    title: "配属発表",
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

  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  if (!user) return null;

  const handleClickItem = () => setOpenMobile(false);

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton className="font-accent w-fit font-semibold" asChild>
              <Link href="/">京産キャンスタ</Link>
            </SidebarMenuButton>
            <Badge asChild>
              <Link href="/admin/puratto">管理者</Link>
            </Badge>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <AdminUserMenu>
                <SidebarMenuButton>
                  <UserAvatar user={user} className="size-6" />
                  <span className="truncate">{user.name}</span>
                  <ChevronDownIcon className="text-muted-foreground ml-auto" />
                </SidebarMenuButton>
              </AdminUserMenu>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) =>
                item.subItems ? (
                  <Collapsible key={item.title} defaultOpen={item.subItems.some((sub) => sub.url === pathname)}>
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <item.icon />
                          {item.title}
                          <ChevronRightIcon className="text-muted-foreground ml-auto transition-transform in-data-[state=open]:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subItems.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                                <Link href={subItem.url} onClick={handleClickItem}>
                                  {subItem.title}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url} onClick={handleClickItem}>
                        <item.icon />
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ),
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem></SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
