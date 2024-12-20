"use client";

import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import DepartmentMembers from "../DepartmentMembers";
import { getDepartmentIcon, getMemberById } from "../members";
import { showConfetti } from "./confetti";

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const member = getMemberById(params.id);

  if (!member) {
    redirect("/event/check-your-department");
  }

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
      <div className="pt-10 font-bold text-white">
        <div className="mx-auto w-fit">
          <div className="animate-fade-slide-in text-4xl opacity-0 delay-500">
            {member.name}
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
          className="w-fit animate-appear-spring rounded-full bg-black/40 p-6 text-white opacity-0"
          style={{
            animationDelay: "5.5s",
          }}
          onClick={showConfetti}
        >
          {getDepartmentIcon(member.department)}
        </div>
        <div
          className="mt-4 animate-appear-spring text-4xl font-bold text-white opacity-0"
          style={{
            animationDelay: "5.5s",
          }}
        >
          {member.department}部署
          <span className="text-xl">です！</span>
        </div>
        <DepartmentMembers
          className="mb-10 mt-16 animate-appear-spring opacity-0"
          style={{
            animationDelay: "6.5s",
          }}
          department={member.department}
          header={
            <div>
              <div>同じ部署のメンバー</div>
              <div className="text-base text-neutral-500">
                {member.department}部署
              </div>
            </div>
          }
          footer={
            <Link
              href="/event/check-your-department/list"
              className="mx-auto mt-8 flex w-fit animate-pulse items-center font-semibold text-blue-500"
            >
              他の部署のメンバーを見る
              <ChevronRightIcon size={20} />
            </Link>
          }
        />
      </div>
    </>
  );
};

export default Page;
