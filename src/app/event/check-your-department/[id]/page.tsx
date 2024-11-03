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

  const showConfetti = () => {
    const colors = ["#ffffff", "#1779C1", "#1779C1"];
    confetti({
      particleCount: 200,
      spread: 100,
      startVelocity: 60,
      colors,
      origin: {
        x: 0.5,
        y: 1,
      },
    });
    confetti({
      particleCount: 100,
      spread: 80,
      angle: 60,
      colors,
      origin: {
        x: 0,
        y: 0.6,
      },
    });
    confetti({
      particleCount: 100,
      spread: 80,
      angle: 120,
      colors,
      origin: {
        x: 1,
        y: 0.6,
      },
    });
  };

  useEffect(() => {
    const timeoutInstance = setTimeout(() => {
      showConfetti();
    }, 5500);

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
          onClick={showConfetti}
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
