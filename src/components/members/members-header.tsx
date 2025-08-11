import Link from "next/link";
import { ToggleTheme } from "../theme-toggle";
import { UserButton } from "../user-button";

export const MembersHeader = () => {
  return (
    <div className="border-b">
      <div className="mx-auto flex h-[47px] max-w-5xl items-center px-6">
        <Link href="/" className="text-sm font-semibold">
          京産キャンスタ
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <ToggleTheme />
          <UserButton />
        </div>
      </div>
    </div>
  );
};
