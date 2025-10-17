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
import { signIn } from "@/lib/auth-client";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState } from "react";
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
  const [submitting, setSubmitting] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await signIn
      .email({
        email: "cts-member@example.com",
        password,
        callbackURL: "/members",
      })
      .finally(() => {
        setSubmitting(false);
      });
    if (error) {
      toast.error(getErrorMessage(error.message));
      setPassword("");
      return;
    }
  };

  return (
    <div className="mx-auto flex max-w-sm flex-col px-6 py-20">
      <div className="flex flex-col gap-6">
        <div className="text-center text-lg font-semibold">ログイン</div>
        <form className="flex flex-col gap-2 px-6" onSubmit={handleSubmit}>
          <InputGroup>
            <InputGroupInput
              type={showPassword ? "text" : "password"}
              placeholder="パスワード"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={submitting}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                type="button"
                onClick={toggleShowPassword}
                variant="secondary"
                disabled={submitting}
              >
                {showPassword ? <EyeIcon /> : <EyeClosedIcon />}
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <Button type="submit" disabled={submitting}>
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
          <Button
            variant="outline"
            disabled={submitting}
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
      </div>
    </div>
  );
};

export default Page;
