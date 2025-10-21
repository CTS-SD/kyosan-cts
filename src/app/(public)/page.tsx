import { Button } from "@/components/ui/button";
import { getConfigValue } from "@/lib/config/actions";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

export default async function Home() {
  const showDeptButton = await getConfigValue(
    "departmentAnnouncementsPublished",
  );

  return (
    <div className="flex flex-col">
      <div className="font-zmg mt-20 mb-12 flex flex-col items-center gap-4 sm:gap-10">
        <div className="text-5xl font-bold sm:text-7xl">#キャンスタ</div>
        <div className="text-sm font-semibold sm:text-xl">
          京都産業大学 キャンパスツアースタッフ
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <Button
          render={<Link href="/puratto">ぷらっとテスト</Link>}
          className="rounded-full"
          size="lg"
          variant={showDeptButton ? "outline" : "default"}
        />
        {showDeptButton && (
          <Button
            size="lg"
            className="rounded-full"
            render={
              <Link href="/members/dept">
                配属発表
                <ArrowRightIcon />
              </Link>
            }
          />
        )}
      </div>
      <div className="absolute inset-0 -z-1 min-h-[100dvh] bg-radial-[at_50%_30%] from-sky-100 via-sky-300 to-blue-900 to-96% dark:bg-radial-[at_50%_100%] dark:from-black dark:via-gray-900 dark:to-blue-900"></div>
    </div>
  );
}
