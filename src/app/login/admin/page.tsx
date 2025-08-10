"use client";

import { GoogleIcon } from "@/components/icons/google-icon";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";

const Page = () => {
  return (
    <Button
      variant="outline"
      className="rounded-full"
      onClick={async () => {
        await signIn.social({
          provider: "google",
          callbackURL: "/admin",
        });
      }}
    >
      <GoogleIcon />
      管理者ログイン
    </Button>
  );
};

export default Page;
