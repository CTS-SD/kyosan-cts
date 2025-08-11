import { AdminUserButton } from "@/components/admin/admin-user-button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { ToggleTheme } from "../theme-toggle";
import { Badge } from "../ui/badge";

export const AdminHeader = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  return (
    <div className="border-b border-dashed">
      <div className="mx-auto flex h-[47px] max-w-5xl items-center gap-4 px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-sm font-semibold">
            京産キャンスタ
          </Link>
          <Link href="/admin">
            <Badge>管理者</Badge>
          </Link>
        </div>
        <div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/admin/puratto">ぷらっとテスト</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/admin/dept">配属発表</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <ToggleTheme />
          <AdminUserButton user={user} />
        </div>
      </div>
    </div>
  );
};
