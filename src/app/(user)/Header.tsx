"use client";

import { isApprovedEmail } from "@/utils/utils";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="">
      <div className="mx-auto flex h-[90px] max-w-5xl items-center border-b border-dashed px-6">
        <Link href="/" className="font-bold tracking-tighter">
          京産キャンスタ
        </Link>
        {isApprovedEmail(session?.user?.email) && (
          <Button variant="ghost" asChild>
            <Link href="/admin" className="group ml-auto block !text-blue-500">
              管理者ページ
              <ArrowRightIcon
                size={16}
                className="ml-0.5 opacity-50 transition group-hover:translate-x-0.5 group-hover:opacity-100"
              />
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
