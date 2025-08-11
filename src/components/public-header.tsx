import Link from "next/link";
import { UserButton } from "./user-button";

export const PublicHeader = async () => {
  return (
    <div className="flex h-12 items-center">
      <Link href="/" className="text-sm font-semibold">
        京産キャンスタ
      </Link>
      <div className="ml-auto">
        <UserButton />
      </div>
    </div>
  );
};
