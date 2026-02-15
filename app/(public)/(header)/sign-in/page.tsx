"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { GoogleIcon } from "@/components/icons/google-icon";
import { PlayfulButton } from "@/components/ui/playful-button";
import { PlayfulInput } from "@/components/ui/playful-input";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { UserAvatar } from "@/components/user-avatar";
import { authClient } from "@/lib/auth/client";
import { env } from "@/lib/env";

const getErrorMessage = (message?: string) => {
  if (message?.includes("password")) {
    return "パスワードが違います。";
  }
  return "エラーが発生しました。";
};

const Page = () => {
  const [password, setPassword] = useState("");
  const [isStaffPending, startStaffTransition] = useTransition();
  const [isAdminPending, setIsAdminPending] = useState(false);

  const isPending = isStaffPending || isAdminPending;

  const staffSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startStaffTransition(async () => {
      const { error } = await authClient.signIn.email({
        email: env.NEXT_PUBLIC_MEMBER_EMAIL,
        password,
        callbackURL: "/members",
      });
      if (error) {
        toast.error(getErrorMessage(error.message));
        setPassword("");
      }
    });
  };

  const adminSignIn = async () => {
    setIsAdminPending(true);
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/admin",
    });
  };

  return (
    <div className="px-4">
      <div className="mx-auto flex max-w-sm flex-col py-20">
        <div className="rounded-4xl bg-surface shadow-lg ring-4 ring-background">
          <div className="flex flex-col items-center gap-2 py-6">
            <UserAvatar className="size-12 bg-background" />
            <h1 className="font-semibold">ｷｬﾝﾊﾟｽﾂｱｰｽﾀｯﾌ専用 ﾛｸﾞｲﾝ</h1>
          </div>
          <div className="p-1.5">
            <div className="flex flex-col gap-6 rounded-3xl bg-card p-6 shadow-xs">
              <form className="flex flex-col gap-2 px-6" onSubmit={staffSignIn}>
                <PlayfulInput
                  type="password"
                  placeholder="パスワード"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isPending}
                />
                <PlayfulButton tint="blue" type="submit" disabled={isPending} className="rounded-full">
                  {isStaffPending && <Spinner />}
                  ログイン
                </PlayfulButton>
              </form>
              <div className="relative">
                <Separator />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4 font-medium text-muted-foreground text-xs">
                  または
                </span>
              </div>
              <div className="flex justify-center px-6">
                <PlayfulButton
                  variant="outline"
                  tint="default"
                  disabled={isPending}
                  onClick={adminSignIn}
                  className="rounded-full"
                >
                  {isAdminPending ? <Spinner /> : <GoogleIcon />}
                  管理者としてログイン
                </PlayfulButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
