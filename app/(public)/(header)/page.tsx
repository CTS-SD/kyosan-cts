import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { PlayfulButton } from "../../../components/ui/playful-button";
import { getCachedConfigValue } from "../../../lib/config/actions";

export default async function Home() {
  const showDeptButton = await getCachedConfigValue("departmentAnnouncementsPublished");

  return (
    <div className="flex flex-col">
      <div className="mt-20 mb-12 flex flex-col items-center gap-4 font-accent sm:gap-10">
        <h1 className="font-bold text-5xl sm:text-7xl">#キャンスタ</h1>
        <div className="font-semibold text-sm sm:text-xl">京都産業大学 キャンパスツアースタッフ</div>
      </div>
      <div className="flex justify-center gap-4">
        <PlayfulButton className="rounded-full px-5" tint="blue" variant={showDeptButton ? "outline" : "solid"} asChild>
          <Link href="/puratto">ぷらっとテスト</Link>
        </PlayfulButton>
        {showDeptButton && (
          <PlayfulButton tint="blue" className="rounded-full px-5" asChild>
            <Link href="/members/dept">
              配属発表
              <ArrowRightIcon />
            </Link>
          </PlayfulButton>
        )}
      </div>
    </div>
  );
}
