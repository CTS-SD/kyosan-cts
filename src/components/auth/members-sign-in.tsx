"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth-client";
import { EyeClosedIcon, EyeIcon, SendHorizontalIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const getErrorMessage = (message?: string) => {
  if (message?.includes("password")) {
    return "パスワードが違います。";
  }
  return "エラーが発生しました。";
};

export const MembersSignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await signIn.email({
      email: "cts-member@example.com",
      password,
      callbackURL: "/members",
    });
    if (error) {
      toast.error(getErrorMessage(error.message));
      setPassword("");
      return;
    }
  };

  return (
    <div className="px-4 py-8 border rounded-md bg-muted grid place-content-center">
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <div className="flex has-[input:focus]:ring-[3px] ring-ring/50 rounded-md [&:has(input:focus)_*]:border-ring">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="パスワード"
            className="border-e-0 rounded-e-none ring-0! bg-background"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="button"
            size="icon"
            onClick={toggleShowPassword}
            variant="outline"
            className="border-s-0 rounded-s-none"
          >
            {showPassword ? <EyeIcon /> : <EyeClosedIcon />}
          </Button>
        </div>
        <Button type="submit" size="icon">
          <SendHorizontalIcon />
        </Button>
      </form>
    </div>
  );
};
