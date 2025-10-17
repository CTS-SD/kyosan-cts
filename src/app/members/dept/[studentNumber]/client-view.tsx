"use client";

import { Button } from "@/components/ui/button";
import { getDepartmentStyles } from "@/lib/department";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

type Props = {
  studentName: string;
  departmentName: string;
};

export const ClientView = ({ studentName, departmentName }: Props) => {
  const deptStyles = getDepartmentStyles(departmentName);

  useEffect(() => {
    setTimeout(() => {
      confetti();
      confetti({
        angle: 60,
        origin: { x: 0 },
      });
      confetti({
        angle: 120,
        origin: { x: 1 },
      });
    }, 6800);
  }, []);

  return (
    <div className="mx-auto max-w-lg p-6 pt-10 sm:pt-20">
      <div className="flex flex-col items-center rounded-3xl p-4 text-white">
        <div className="flex flex-col items-center gap-6 text-2xl font-semibold select-none">
          <div className="flex items-baseline transition delay-1000 duration-600 ease-out starting:translate-y-2 starting:opacity-0 starting:blur-xs">
            <div className="bg-white text-4xl font-bold text-black shadow-xl">
              {studentName}
            </div>
            <div className="ml-2">さんの</div>
          </div>
          <div className="flex items-baseline text-3xl font-bold *:transition *:starting:opacity-0">
            <div className="transition delay-2000 duration-600">配属先は</div>
            <div className="flex *:transition *:duration-600 *:starting:translate-y-2 *:starting:opacity-0">
              <div className="delay-3200">.</div>
              <div className="delay-4400">.</div>
              <div className="delay-5600">.</div>
            </div>
          </div>
          <div className="flex w-fit items-baseline transition delay-6800 duration-400 ease-out starting:scale-80 starting:opacity-0">
            <div className="bg-white shadow-2xl">
              <div
                className={cn(
                  "bg-clip-text text-5xl font-bold text-transparent",
                  deptStyles,
                )}
              >
                {departmentName}
              </div>
            </div>
            <div className="ml-2 text-2xl font-semibold">です！</div>
          </div>
        </div>
        <div className="mt-10 transition delay-8800 ease-out starting:scale-0 starting:opacity-0">
          <Button
            asChild
            variant="link"
            size="lg"
            className="font-bold text-white"
          >
            <Link href="/members/dept/list">
              部署一覧を見る
              <ArrowRightIcon />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
