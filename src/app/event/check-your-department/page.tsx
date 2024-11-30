"use client";

import peopleImage from "@/assets/people.svg";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/utils/utils";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getMemberById } from "./members";

const Page = () => {

  const [studentId, setStudentId] = useState("");
  const router = useRouter();
  const [hideCard, setHideCard] = useState(false);

  const handleSubmit = () => {
    const member = getMemberById(`g2${studentId}`);
    if (!member) {
      window.alert("該当する学生が見つかりませんでした。");
      setStudentId("");
      return;
    }
    setHideCard(true);
    setTimeout(() => {
      router.push(`/event/check-your-department/${member.id}`);
    }, 500);
  };

  return (
    <div
      className={cn(
        "mx-auto w-[min(95%,500px)] animate-fade-slide-in sm:mt-10 md:mt-20",
        hideCard && "animate-fade-slide-out",
      )}
    >
      <div
        className={cn(
          "mx-auto flex flex-col items-center rounded-2xl bg-white py-10 text-black shadow-lg transition-all duration-300 sm:py-14",
        )}
      >
        <h1 className="whitespace-pre text-center text-3xl font-bold">
          配属発表
          <wbr />
          2024
        </h1>
        <div className="mt-2 whitespace-pre px-10 text-center text-sm leading-none text-neutral-500">
          学籍番号を入力して
          <wbr />
          配属部署を確認しましょう！
        </div>
        <div className="relative mx-auto h-[140px] w-[95%] animate-fade-slide-in rounded-t-3xl">
          <Image
            src={peopleImage.src!}
            alt="京産キャンスタ"
            className="pt-6"
            fill
          />
        </div>
        <form
          className=""
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="flex items-center space-x-2 font-semibold">
            <div>g2</div>
            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS}
              value={studentId}
              onChange={(v) => setStudentId(v)}
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
          </div>
          <Button
            type="submit"
            disabled={studentId.length !== 6}
            className="mt-4 w-full shrink-0"
            variant="primary"
          >
            決定
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
