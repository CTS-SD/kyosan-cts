import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col gap-4 pt-20 px-6 max-w-3xl mx-auto">
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
        <div className="mt-20 flex justify-center">
          <Button variant="link" asChild>
            <Link href="/puratto">
              『ぷらっとテスト』に挑戦
              <ArrowRightIcon />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
