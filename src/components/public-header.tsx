import Link from "next/link";
import { UserButton } from "./user-button";
import { ToggleTheme } from "./theme-toggle";

export const PublicHeader = async () => {
  return (
    <div className="flex h-12 items-center">
      <Link href="/" className="text-sm font-semibold">
        京産キャンスタ
      </Link>
      <div className="ml-auto flex items-center gap-2">
        <ToggleTheme />
        <UserButton />
      </div>
    </div>
  );
};
