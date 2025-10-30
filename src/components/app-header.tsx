import Link from "next/link";
import { UserButton } from "./user-button";

export const AppHeader = () => {
  return (
    <div className="mx-auto flex h-12 max-w-5xl items-center px-6">
      <Link href="/" className="text-sm font-semibold">
        京産キャンスタ
      </Link>
      <div className="ml-auto flex items-center gap-2">
        <UserButton />
      </div>
    </div>
  );
};
