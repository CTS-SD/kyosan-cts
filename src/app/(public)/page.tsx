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
      <div className="my-20 text-center text-6xl font-semibold">
        京産キャンスタ
      </div>
      <div className="flex justify-center gap-2">
        <Button variant="secondary" asChild>
          <Link href="/puratto">ぷらっとテスト</Link>
        </Button>
        {showDeptButton && (
          <Button asChild variant="special">
            <Link href="/members/dept">
              配属発表
              <ArrowRightIcon />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
