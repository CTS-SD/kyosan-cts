import { Badge } from "@/components/ui/badge";
import { SlashIcon } from "lucide-react";
import Link from "next/link";

type Props = {};

const Header = ({}: Props) => {
  return (
    <div className="flex items-center p-4 justify-between border-b">
      <Link href="/" className="font-bold flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          KSU
          <SlashIcon size={14} />
          CTS
        </div>
        <Badge variant="outline">Admin</Badge>
      </Link>
      <div className="flex gap-4 text-sm items-center font-semibold">
        <Link href="/admin/test">ぷらっとテスト</Link>
        <Link href="/admin/settings">設定</Link>
      </div>
    </div>
  );
};

export default Header;
