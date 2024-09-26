import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import Header from "./Header";

export const metadata: Metadata = {
  title: "京産キャンスタ",
};

const Page = () => {
  return (
    <>
      <Header />
      <main className="">
        <div className="p-8">
          <h1 className="text-4xl font-bold">キャンスタ</h1>
          <div className="font-bold">京都産業大学</div>
        </div>
        <div className="px-4">
          <Button asChild>
            <Link className="mt-6" href="/test">
              ぷらっとテスト
            </Link>
          </Button>
        </div>
      </main>
    </>
  );
};

export default Page;
