import { AdminUserButton } from "@/components/admin/admin-user-button";
import { getSession } from "@/lib/auth/actions";
import Link from "next/link";
import { ToggleTheme } from "../theme-toggle";
import { Badge } from "../ui/badge";
import { NavLink, NavMenu } from "../ui/nav-menu";

export const AdminHeader = async () => {
  const session = await getSession();
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
          <NavMenu>
            <NavLink href="/admin/puratto">ぷらっとテスト</NavLink>
            <NavLink href="/admin/dept">配属発表</NavLink>
            <NavLink href="/admin/settings">設定</NavLink>
          </NavMenu>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <ToggleTheme />
          {user && <AdminUserButton user={user} />}
        </div>
      </div>
    </div>
  );
};
