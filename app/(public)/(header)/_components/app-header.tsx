import Link from "next/link";
import { Suspense } from "react";
import { LogoText } from "@/components/blocks/logo-text";
import { UserButton } from "@/features/auth/components/user-button";

export const AppHeader = () => {
  return (
    <div className="fixed top-0 right-0 left-0 z-50 px-6 pt-2">
      <div className="mx-auto flex h-12 max-w-lg items-center gap-2 rounded-full border bg-background ps-4 pe-1.25 shadow-xs">
        <Link href="/">
          <LogoText />
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <Suspense>
            <div className="starting:opacity-0 transition-opacity">
              <UserButton />
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
};
