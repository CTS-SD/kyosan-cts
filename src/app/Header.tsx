import { auth } from "@/lib/auth";
import { isApprovedEmail } from "@/utils/utils";
import Link from "next/link";

type Props = {};

const Header = async ({}: Props) => {
  const session = await auth();

  return (
    <header className="py-2 px-4 border-b flex items-center h-[60px]">
      <Link href="/" className="font-bold tracking-tighter">
        京産キャンスタ
      </Link>
      {isApprovedEmail(session?.user?.email) && (
        <Link
          href="/admin"
          className="border rounded-md text-sm py-2 px-4 bg-neutral-50 font-semibold ml-auto block"
        >
          管理者ページ
        </Link>
      )}
    </header>
  );
};

export default Header;
