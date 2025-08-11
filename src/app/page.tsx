import { PublicHeader } from "@/components/public-header";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <PublicHeader />
      <div className="flex flex-col py-16">
        <div className="flex flex-col items-center gap-10 font-mono text-7xl font-medium sm:text-8xl">
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
            <Link href="/puratto">ぷらっとテスト</Link>
          </Button>
          <Button asChild variant="special">
            <Link href="/members/dept">
              配属発表
              <ArrowRightIcon />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
