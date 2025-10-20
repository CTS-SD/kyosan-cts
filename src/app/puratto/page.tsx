import { PublicHeader } from "@/components/public-header";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="mx-auto max-w-5xl p-6 pt-0">
      <PublicHeader />
      <div className="my-20 flex flex-col items-center">
        <div className="text-3xl font-semibold sm:text-5xl">ぷらっとテスト</div>
        <div className="mt-10 flex gap-2">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeftIcon />
              ホームに戻る
            </Link>
          </Button>
          <Button>
            <Link href="/puratto/play">スタート</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
