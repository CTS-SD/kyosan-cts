import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { PlayfulButton } from "../../../../components/ui/playful-button";

const Page = () => {
  return (
    <div className="my-20 flex flex-col items-center gap-6 px-6">
      <h1 className="font-accent font-black text-3xl sm:text-5xl">ぷらっとテスト</h1>
      <p className="font-accent font-semibold text-muted-foreground sm:text-lg">
        ランダムに出題されるクイズに答えて知識を確認！
      </p>
      <div className="flex gap-2">
        <PlayfulButton variant="outline" tint="default" className="rounded-full" asChild>
          <Link href="/">
            <ArrowLeftIcon />
            戻る
          </Link>
        </PlayfulButton>
        <PlayfulButton tint="blue" className="rounded-full px-5" asChild>
          <Link href="/puratto/play">スタート</Link>
        </PlayfulButton>
      </div>
    </div>
  );
};

export default Page;
