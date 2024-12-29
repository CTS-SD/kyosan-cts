"use client";

import { isApprovedEmail } from "@/utils/utils";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { SettingsIcon } from "lucide-react";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="">
      <div className="mx-auto flex h-[90px] max-w-5xl items-center border-b border-dashed px-6">
        <Link href="/" className="font-bold tracking-tighter">
          京産キャンスタ
        </Link>
        {isApprovedEmail(session?.user?.email) && (
          <Link href="/admin" className="ml-auto">
            <SettingsIcon size={20} />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
