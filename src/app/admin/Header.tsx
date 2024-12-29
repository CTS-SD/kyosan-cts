"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const [borderPos, setBorderPos] = useState({
    left: null as number | null,
    width: null as number | null,
    opacity: 0,
  });
  const navContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div className="mx-auto flex h-[60px] max-w-6xl items-center px-4">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="flex items-center gap-0.5 font-bold">
            京産キャンスタ
          </div>
          <Badge>管理者</Badge>
        </Link>
        <Link href="/" className="ml-auto flex items-center gap-2 text-sm">
          <HomeIcon size={20} />
        </Link>
      </div>
      <div className="border-b">
        <div
          ref={navContainerRef}
          className="relative top-0 mx-auto flex h-12 max-w-6xl items-center gap-4 bg-white/80 px-4 text-sm font-semibold backdrop-blur-sm"
        >
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
          <div
            className="absolute bottom-0 h-1 rounded-t-full bg-black transition-all"
            style={{
              width: borderPos.width ? borderPos.width : "",
              left: borderPos.left
                ? borderPos.left -
                  (navContainerRef?.current?.getBoundingClientRect().left ?? 0)
                : "",
              opacity: borderPos.opacity,
            }}
          ></div>
        </div>
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
