import Link from "next/link";
import { Suspense } from "react";
import { LogoText } from "./logo-text";
import { UserButton } from "./user-button";

export const AppHeader = () => {
  return (
    <div className="fixed top-0 right-0 left-0 mx-auto max-w-xl p-2">
      <div className="mx-auto flex h-12 items-center rounded-full bg-background ps-5 pe-2 shadow-sm">
        <Link href="/" className="font-accent font-semibold text-sm">
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
