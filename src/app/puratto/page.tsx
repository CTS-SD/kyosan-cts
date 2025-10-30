import { AppHeader } from "@/components/app-header";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <AppHeader />
      <div className="mx-auto max-w-5xl p-6 pt-0">
        <div className="my-20 flex flex-col items-center">
          <div className="font-zmg text-3xl font-bold sm:text-5xl">
            ぷらっとテスト
          </div>
          <div className="mt-10 flex gap-2">
            <Button
              variant="ghost"
              className="rounded-full"
              size="lg"
              render={
                <Link href="/">
                  <ArrowLeftIcon />
                  ホームに戻る
                </Link>
              }
            />
            <Button
              size="lg"
              className="rounded-full"
              render={<Link href="/puratto/play">スタート</Link>}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
