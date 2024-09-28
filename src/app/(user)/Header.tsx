"use client";

import { isApprovedEmail } from "@/utils/utils";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

type Props = {};

const Header = ({}: Props) => {
  const { data: session } = useSession();

  return (
    <header className="">
      <div className="h-[90px] px-6 max-w-5xl mx-auto flex items-center border-b border-dashed">
        <Link href="/" className="font-bold tracking-tighter">
          京産キャンスタ
        </Link>
        {isApprovedEmail(session?.user?.email) && (
          <Button variant="ghost" asChild>
            <Link href="/admin" className="ml-auto block !text-blue-500 group">
              管理者ページ
              <ArrowRightIcon
                size={16}
                className="group-hover:translate-x-0.5 ml-0.5 transition opacity-50 group-hover:opacity-100"
              />
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
