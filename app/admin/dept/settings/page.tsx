import type { Metadata } from "next";
import { getConfigValue } from "@/features/config/actions";
import { VisibilitySetting } from "./_components/visibility-setting";
import { YearSetting } from "./_components/year-setting";

export const metadata: Metadata = {
  title: "表示設定 - 配属発表",
};

const Page = async () => {
  const [year, published] = await Promise.all([
    getConfigValue("departmentAnnouncementsYear"),
    getConfigValue("departmentAnnouncementsPublished"),
  ]);

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="space-y-6">
        <YearSetting initialYear={year} />
        <VisibilitySetting initialPublished={published} />
      </div>
    </div>
  );
};

export default Page;
