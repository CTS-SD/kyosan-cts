import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "京産キャンスタ",
};

const Page = () => {
  return (
    <main className="">
      <div className="flex flex-col items-center py-10">
        <h1 className="mx-auto flex flex-col px-6 text-center text-6xl sm:text-8xl font-black">
          <span>CAMPUS</span>
          <span>TOUR STAFF</span>
        </h1>
        <span className="mt-2 text-2xl">
          <Link href="/admin">@</Link>kyosan_cts
        </span>
      </div>
      <div className="flex w-full justify-center">
        <Button className="w-fit" size="xl" asChild>
          <Link className="" href="/test">
            ぷらっとテスト
          </Link>
        </Button>
      </div>
    </main>
  );
};

export default Page;
