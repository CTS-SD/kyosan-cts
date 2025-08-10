import { PublicHeader } from "@/components/public-header";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 pt-0">
      <PublicHeader />
      <div className="flex flex-col items-center my-20">
        <div className="text-3xl sm:text-5xl font-semibold">ぷらっとテスト</div>
        <div className="mt-10 flex gap-2">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeftIcon />
              ホームに戻る
            </Link>
          </Button>
          <Button asChild>
            <Link href="/puratto/play">スタート</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
