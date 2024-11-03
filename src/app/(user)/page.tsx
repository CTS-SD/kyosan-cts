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
      <div className="pb-4 pt-10 md:pb-8">
        <h1 className="mx-auto flex max-w-5xl flex-col bg-gradient-to-br from-cyan-500 to-blue-600 bg-clip-text px-6 text-5xl font-black text-transparent sm:text-7xl lg:text-8xl">
          <span>CAMPUS</span>
          <span>TOUR STAFF</span>
          <span className="text-xl sm:text-2xl lg:text-4xl">
            <Link href="/admin">@</Link>kyosan_cts
          </span>
        </h1>
      </div>
      <div className="mx-auto max-w-5xl p-6">
        <div className="flex w-full flex-wrap gap-4">
          <Button variant="primary-outline" className="w-fit" size="xl" asChild>
            <Link className="" href="/test">
              ぷらっとテスト
              <ArrowRightIcon
                size={20}
                className="ml-0.5 opacity-50 transition group-hover:translate-x-0.5 group-hover:opacity-100"
              />
            </Link>
          </Button>
          <Button variant="primary" className="w-fit" size="xl" asChild>
            <Link className="" href="/event/check-your-department">
              配属発表2024
              <ArrowRightIcon
                size={20}
                className="ml-0.5 opacity-50 transition group-hover:translate-x-0.5 group-hover:opacity-100"
              />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Page;
