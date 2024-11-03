"use client";

import { redirect } from "next/navigation";
import { getDepartmentIcon, members } from "../members";
import { PiggyBankIcon } from "lucide-react";
import { useEffect } from "react";
import confetti from "canvas-confetti";

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const department = members[params.id as keyof typeof members];

  if (!department) {
    redirect("/event/check-your-department");
  }

  const showConfetti = (x?: number, y?: number) => {
    confetti({
      particleCount: 300,
      spread: 100,
      origin: {
        x: x ?? 0.5,
        y: y ?? 0.6,
      },
    });
  };

  const showRandomConfetti = () => {
    const x = Math.random();
    const y = Math.random();
    showConfetti(x, y);
  };

  const handleClicked = () => {
    for (let i = 0; i < 3; i++) {
      showRandomConfetti();
    }
  };

  const handleShare = () => {
    navigator.share({
      title: "Your department is " + department,
      text: "Your department is " + department,
      url: window.location.href,
    });
  };

  useEffect(() => {
    const timeoutInstance = setTimeout(() => {
      showConfetti();
    }, 5700);

    return () => {
      clearTimeout(timeoutInstance);
    };
  }, []);

  return (
    <>
      <div className="pt-20 font-bold text-white">
        <div className="mx-auto w-fit">
          <div className="animate-fade-slide-in text-4xl opacity-0 delay-500">
            {params.id}
            <span className="text-base">さんの</span>
          </div>
          <div className="flex text-5xl">
            <div
              style={{
                animationDelay: "1.5s",
              }}
              className="animate-fade-slide-in opacity-0"
            >
              配属先は
            </div>
            <div
              className="animate-fade-slide-in opacity-0"
              style={{
                animationDelay: "2.5s",
              }}
            >
              .
            </div>
            <div
              className="animate-fade-slide-in opacity-0"
              style={{
                animationDelay: "3.5s",
              }}
            >
              .
            </div>
            <div
              className="animate-fade-slide-in opacity-0"
              style={{
                animationDelay: "4.5s",
              }}
            >
              .
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-col items-center">
        <div
          className="animate-appear-spring w-fit rounded-full bg-black/40 p-6 text-white opacity-0"
          style={{
            animationDelay: "5.5s",
          }}
        >
          {getDepartmentIcon(department)}
        </div>
        <div
          className="animate-appear-spring mt-2 text-4xl font-bold text-white opacity-0"
          style={{
            animationDelay: "5.5s",
          }}
        >
          {department}
          <span className="text-xl">です！</span>
        </div>
      </div>
    </>
  );
};

export default Page;
