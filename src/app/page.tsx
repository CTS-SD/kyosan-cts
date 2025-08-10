import { PublicHeader } from "@/components/public-header";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <PublicHeader />
      <div className="flex flex-col py-16">
        <div className="text-7xl sm:text-8xl font-medium font-mono flex flex-col gap-10 items-center">
          <div className="">
            <span>K</span>
            <span>Y</span>
            <span>O</span>
          </div>
          <div className="">
            <span>S</span>
            <Link href="admin">A</Link>
            <span>N</span>
          </div>
          <div className="">
            <span>C</span>
            <span>T</span>
            <span>S</span>
          </div>
        </div>
        <div className="mt-20 flex justify-center gap-2">
          <Button variant="secondary" asChild>
            <Link href="/puratto">
              ぷらっとテスト
            </Link>
          </Button>
          <Button asChild variant="special">
            <Link href="/members/busho">
              部署発表
              <ArrowRightIcon />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
