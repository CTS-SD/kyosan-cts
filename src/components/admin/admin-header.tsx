import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";

type Props = {};

const AdminHeader = ({}: Props) => {
  return (
    <div className="border-b border-dashed">
      <div className="h-12 flex items-center px-6 max-w-5xl mx-auto">
        <Link href="/admin" className="font-semibold">
          CTS
        </Link>
        <div className="ml-4">
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
        <div className="ml-auto">
          <Button size="icon" variant="ghost" asChild>
            <Link href="/">
              <LogOutIcon />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
