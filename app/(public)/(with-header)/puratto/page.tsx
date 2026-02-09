import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { PlayfulButton } from "../../../../components/ui/playful-button";

const Page = () => {
  return (
    <div className="my-20 flex flex-col items-center">
      <h1 className="font-accent font-bold text-3xl sm:text-5xl">ぷらっとテスト</h1>
      <div className="mt-10 flex gap-2">
        <PlayfulButton variant="outline" tint="default" className="rounded-full" asChild>
          <Link href="/">
            <ArrowLeftIcon />
            戻る
          </Link>
        </PlayfulButton>
        <PlayfulButton tint="blue" className="rounded-full px-5" asChild>
          <Link href="/puratto/play">今すぐ開始</Link>
        </PlayfulButton>
      </div>
    </div>
  );
};

export default Page;
