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
} from "@/components/ui/sidebar";
import { getSession } from "@/lib/auth/actions";
import {
  ChevronsUpDownIcon,
  CogIcon,
  NotebookIcon,
  UsersRoundIcon,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
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

export const AdminSidebar = async () => {
  const session = await getSession();
  const user = session?.user;
  if (!user) return null;

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
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <AdminUserMenu>
              <SidebarMenuButton className="h-10">
                <Avatar className="size-6">
                  <AvatarImage src={user.image || ""} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
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
