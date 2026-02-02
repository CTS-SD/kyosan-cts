import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <div className="my-20 flex flex-col items-center">
      <h1 className="font-accent font-bold text-3xl sm:text-5xl">ぷらっとテスト</h1>
      <div className="mt-10 flex gap-2">
        <Button variant="ghost" className="rounded-full" size="lg" asChild>
          <Link href="/">
            <ArrowLeftIcon />
            ホームに戻る
          </Link>
        </Button>
        <Button size="lg" className="rounded-full" asChild>
          <Link href="/puratto/play">スタート</Link>
        </Button>
      </div>
    </div>
  );
};

export default Page;
