import Link from "next/link";
import { UserButton } from "../user-button";

export const MembersHeader = () => {
  return (
    <div className="border-b">
      <div className="h-[47px] max-w-5xl mx-auto px-6 flex items-center">
        <Link href="/" className="text-sm font-semibold">
          京産キャンスタ
        </Link>
        <div className="ml-auto">
          <UserButton />
        </div>
      </div>
    </div>
  );
};
