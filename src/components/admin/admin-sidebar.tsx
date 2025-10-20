import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CogIcon, NotebookIcon, UsersRoundIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";

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
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
