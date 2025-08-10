"use client";

import { GoogleIcon } from "@/components/icons/google-icon";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";

export const AdminSignIn = () => {
  return (
    <div className="px-4 py-8 border rounded-md bg-muted grid place-content-center">
      <Button
        variant="outline"
        onClick={async () => {
          await signIn.social({
            provider: "google",
            callbackURL: "/admin",
          });
        }}
      >
        <GoogleIcon />
        管理者としてログイン
      </Button>
    </div>
  );
};
