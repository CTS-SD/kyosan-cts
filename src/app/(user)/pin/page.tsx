"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { client } from "@/db/hono";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useState } from "react";

const Page = () => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    const res = await client.api.token.$post({
      json: {
        pin,
      },
    });
    if (!res.ok) {
      setLoading(false);
      setPin("");
      setError("パスコードが正しくありません。");
      return;
    }
    const { token } = await res.json();
    document.cookie = `user_token=${token}; path=/`;
    const next = new URLSearchParams(window.location.search).get("next");
    console.log(next);
    window.location.href = next || "/";
  };

  return (
    <div className="">
      <form
        className="m-6 mx-auto flex w-[min(400px,90vw)] flex-col items-center gap-4 rounded-xl border p-6 shadow-xl"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="text-center">
          <div className="text-lg font-semibold">ユーザー認証</div>
          <div className="text-sm text-neutral-500">
            指定のパスコードを入力してください
          </div>
        </div>
        <div>
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            value={pin}
            onChange={(v) => setPin(v)}
          >
            <InputOTPGroup className="bg-white font-semibold [&>*]:text-base">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <Button
            className="mt-4 w-full"
            disabled={pin.length !== 6 || loading}
          >
            決定
          </Button>
          <div className="mt-2 text-sm text-red-500">{error}</div>
        </div>
      </form>
    </div>
  );
};

export default Page;
