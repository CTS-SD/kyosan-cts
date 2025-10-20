import Link from "next/link";
import { Badge } from "../ui/badge";
import { SidebarTrigger } from "../ui/sidebar";

export const AdminHeader = async () => {
  return (
    <div className="border-b border-dashed md:hidden">
      <div className="mx-auto flex h-[47px] max-w-5xl items-center gap-4 px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-sm font-semibold">
            京産キャンスタ
          </Link>
          <Link href="/admin">
            <Badge>管理者</Badge>
          </Link>
        </div>
      </div>
    </div>
  );
};
