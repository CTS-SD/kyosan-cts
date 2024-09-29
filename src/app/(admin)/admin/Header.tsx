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
      <div className="mx-auto flex h-[60px] max-w-5xl items-center px-3">
        <Link
          href="/"
          className="mr-3 grid size-8 place-content-center rounded-sm border border-neutral-200 bg-neutral-50"
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
      <div className="relative border-b">
        <div className="sticky top-0 mx-auto flex h-12 max-w-5xl items-center gap-4 bg-white/80 px-4 text-sm font-semibold backdrop-blur-sm">
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
          className="absolute bottom-0 h-1 rounded-full bg-black transition-all"
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
        "flex h-full items-center transition-all active:scale-95",
        !path.startsWith(href) && "text-neutral-500",
      )}
      ref={itemRef}
    >
      {name}
    </Link>
  );
};

export default Header;
