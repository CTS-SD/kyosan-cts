"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ChevronLeft, MoveLeftIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Props = {};

const Header = ({}: Props) => {
  const [borderPos, setBorderPos] = useState({
    left: null as number | null,
    width: null as number | null,
    opacity: 0,
  });

  return (
    <div>
      <div className="h-[60px] flex items-center px-3 max-w-5xl mx-auto">
        <Link
          href="/"
          className="size-8 rounded-sm grid place-content-center mr-3 bg-neutral-50 border border-neutral-200"
        >
          <ChevronLeft />
        </Link>
        <Link href="/admin" className="flex items-center gap-2">
          <div className="flex items-center gap-0.5 font-bold">
            京産キャンスタ
          </div>
          <Badge>管理者</Badge>
        </Link>
      </div>
      <div className="border-b relative">
        <div className="flex gap-4 max-w-5xl mx-auto text-sm items-center px-4 h-12 font-semibold sticky top-0  bg-white/80 backdrop-blur-sm">
          <NavItem
            href="/admin/test"
            name="ぷらっとテスト"
            setBorderPos={setBorderPos}
          />
          <NavItem
            href="/admin/settings"
            name="設定"
            setBorderPos={setBorderPos}
          />
        </div>
        <div
          className="absolute h-1 bg-black bottom-0 transition-all rounded-full"
          style={{
            width: borderPos.width ? borderPos.width : "",
            left: borderPos.left ? borderPos.left : "",
            opacity: borderPos.opacity,
          }}
        ></div>
      </div>
    </div>
  );
};

type NavItemProps = {
  href: string;
  name: string;
  setBorderPos: (pos: {
    left: number | null;
    width: number | null;
    opacity: number;
  }) => void;
};

const NavItem = ({ href, name, setBorderPos }: NavItemProps) => {
  const path = usePathname();
  const itemRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (itemRef.current && path.startsWith(href)) {
      const { left, width } = itemRef.current.getBoundingClientRect();
      setBorderPos({ left, width, opacity: 1 });
    }
  }, [path]);

  return (
    <Link
      href={href}
      className={cn(
        "h-full flex items-center transition-all active:scale-95",
        !path.startsWith(href) && "text-neutral-500"
      )}
      ref={itemRef}
    >
      {name}
    </Link>
  );
};

export default Header;
