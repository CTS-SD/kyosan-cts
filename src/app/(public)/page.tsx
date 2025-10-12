import { PublicHeader } from "@/components/public-header";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col py-16">
      <div className="flex flex-col items-center leading-18 tracking-[1rem] font-mono text-7xl font-medium sm:text-8xl">
        <div className="">KYO</div>
        <div className="">
          S<Link href="admin">A</Link>N
        </div>
        <div className="">CTS</div>
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
  );
}
