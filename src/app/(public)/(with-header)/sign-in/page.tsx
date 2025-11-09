"use client";

import { GoogleIcon } from "@/components/icons/google-icon";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { signIn } from "@/lib/auth/client";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const getErrorMessage = (message?: string) => {
  if (message?.includes("password")) {
    return "パスワードが違います。";
  }
  return "エラーが発生しました。";
};

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [isStaffPending, startStaffTransition] = useTransition();
  const [isAdminPending, setIsAdminPending] = useState(false);

  const isPending = isStaffPending || isAdminPending;

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const staffSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startStaffTransition(async () => {
      const { error } = await signIn.email({
        email: "cts-member@example.com",
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
    await signIn.social({
      provider: "google",
      callbackURL: "/admin",
    });
  };

  return (
    <div className="mx-auto flex max-w-sm flex-col px-6 py-20">
      <div className="flex flex-col gap-6">
        <h1 className="text-center text-lg font-semibold">ログイン</h1>
        <form className="flex flex-col gap-2 px-6" onSubmit={staffSignIn}>
          <InputGroup className="w-full">
            <InputGroupInput
              type={showPassword ? "text" : "password"}
              placeholder="パスワード"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isPending}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                type="button"
                onClick={toggleShowPassword}
                variant="ghost"
                disabled={isPending}
                size="icon-sm"
              >
                {showPassword ? <EyeIcon /> : <EyeClosedIcon />}
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <Button type="submit" disabled={isPending}>
            {isStaffPending && <Spinner />}
            スタッフとしてログイン
          </Button>
        </form>
        <div className="relative">
          <Separator />
          <span className="bg-background text-muted-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 text-sm">
            OR
          </span>
        </div>
        <div className="flex justify-center px-6">
          <Button variant="outline" disabled={isPending} onClick={adminSignIn}>
            {isAdminPending ? <Spinner /> : <GoogleIcon />}
            管理者としてログイン
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
