import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";

export const AdminHeader = () => {
  return (
    <div className="border-b border-dashed">
      <div className="h-[47px] flex items-center px-6 max-w-5xl mx-auto gap-4">
        <div className="flex items-center gap-3 font-bold text-sm">
          <Link href="/">CTS</Link>
          <div className="w-px h-5 bg-border rotate- rounded-full rotate-30"></div>
          <Link href="/admin/puratto">管理者</Link>
        </div>
        <div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/admin/puratto" className="font-semibold">
                    ぷらっとテスト
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
};
