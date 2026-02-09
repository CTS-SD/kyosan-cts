import { ArrowLeftIcon, InfinityIcon } from "lucide-react";
import Link from "next/link";
import { PlayfulButton } from "../../../../components/ui/playful-button";
import { getCachedConfigValue } from "../../../../lib/config/actions";

const Page = async () => {
  const count = await getCachedConfigValue("purattoTestQuestionCount");

  const rows = [
    { label: "出題数", value: `${count}問` },
    { label: "制限時間", value: <InfinityIcon /> },
  ];

  return (
    <div className="my-20 flex flex-col items-center gap-6 px-6">
      <h1 className="font-accent font-black text-3xl sm:text-5xl">ぷらっとテスト</h1>
      <p className="font-accent font-semibold text-muted-foreground sm:text-lg">
        ランダムに出題されるクイズに答えて知識を確認！
      </p>
      <div className="w-60 rounded-xl border bg-card">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4 border-b px-4 py-3">
            <div className="">{row.label}</div>
            <div className="grow border-b-2 border-dashed"></div>
            <div className="font-bold">{row.value}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <PlayfulButton variant="outline" tint="default" className="rounded-full" asChild>
          <Link href="/">
            <ArrowLeftIcon />
            戻る
          </Link>
        </PlayfulButton>
        <PlayfulButton tint="blue" className="rounded-full px-5" asChild>
          <Link href="/puratto/play">今すぐスタート</Link>
        </PlayfulButton>
      </div>
    </div>
  );
};

export default Page;
