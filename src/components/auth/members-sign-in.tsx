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
    <div className="bg-muted grid place-content-center rounded-md border px-4 py-8">
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <div className="ring-ring/50 [&:has(input:focus)_*]:border-ring flex rounded-md has-[input:focus]:ring-[3px]">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="パスワード"
            className="bg-background rounded-e-none border-e-0 ring-0!"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="button"
            size="icon"
            onClick={toggleShowPassword}
            variant="outline"
            className="rounded-s-none border-s-0"
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
