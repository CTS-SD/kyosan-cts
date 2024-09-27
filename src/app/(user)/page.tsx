import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "京産キャンスタ",
};

const Page = () => {
  return (
    <main className="">
      <div className="py-10 px-6 bg-gradient-to-br from-blue-800 to-cyan-500 text-white">
        <h1 className="text-5xl flex flex-col font-black italic max-w-5xl mx-auto">
          <span>CAMPUS</span>
          <span>TOUR STAFF</span>
          <span className="text-xl">@kyosan_cts</span>
        </h1>
      </div>
      <div className="p-4 max-w-5xl mx-auto">
        <div className="p-6 border rounded-2xl">
          <div className="font-semibold">
            ぷらっとテストで知識を試してみましょう！
          </div>
          <div className="mt-6 flex justify-end">
            <Button asChild>
              <Link className="" href="/test">
                ぷらっとテストを受ける
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
