"use client";

import { isApprovedEmail } from "@/utils/utils";
import Link from "next/link";
import { useSession } from "next-auth/react";

type Props = {};

const Header = ({}: Props) => {
  const { data: session } = useSession();

  return (
    <header className="border-b">
      <div className="py-2 px-4 max-w-5xl mx-auto flex items-center h-[60px]">
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
      </div>
    </header>
  );
};

export default Header;
