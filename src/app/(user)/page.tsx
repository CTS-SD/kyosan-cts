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
      <div className="pt-10 pb-4 md:pb-8">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl flex flex-col font-black px-6 max-w-5xl mx-auto bg-clip-text text-transparent bg-gradient-to-br from-cyan-500 to-blue-600">
          <span>CAMPUS</span>
          <span>TOUR STAFF</span>
          <span className="text-xl sm:text-2xl lg:text-4xl">
            <Link href="/admin">@</Link>kyosan_cts
          </span>
        </h1>
      </div>
      <div className="p-6 max-w-5xl mx-auto">
        <div className="flex w-full">
          <Button variant="primary-outline" className="w-fit" size="xl" asChild>
            <Link className="" href="/test">
              ぷらっとテスト
              <ArrowRightIcon
                size={20}
                className="group-hover:translate-x-0.5 ml-0.5 transition opacity-50 group-hover:opacity-100"
              />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Page;
