import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getConfigValue } from "@/lib/config/actions";

export const dynamic = "force-static";
export const revalidate = 0;

export default async function Home() {
  const showDeptButton = await getConfigValue("departmentAnnouncementsPublished");

  return (
    <div className="flex flex-col">
      <div className="mt-20 mb-12 flex flex-col items-center gap-4 font-accent sm:gap-10">
        <h1 className="font-bold text-5xl sm:text-7xl">#キャンスタ</h1>
        <div className="font-semibold text-sm sm:text-xl">京都産業大学 キャンパスツアースタッフ</div>
      </div>
      <div className="flex justify-center gap-4">
        <Button className="rounded-full" size="lg" variant={showDeptButton ? "outline" : "default"} asChild>
          <Link href="/puratto">ぷらっとテスト</Link>
        </Button>
        {showDeptButton && (
          <Button size="lg" className="rounded-full" asChild>
            <Link href="/members/dept">
              配属発表
              <ArrowRightIcon />
            </Link>
          </Button>
        )}
      </div>
      <div className="absolute inset-0 -z-1 min-h-dvh bg-radial-[at_50%_30%] from-sky-100 via-sky-300 to-96% to-blue-900 dark:bg-radial-[at_50%_100%] dark:from-black dark:via-gray-900 dark:to-blue-900"></div>
    </div>
  );
}
