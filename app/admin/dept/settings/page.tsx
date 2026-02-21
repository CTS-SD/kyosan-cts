import type { Metadata } from "next";
import { getConfig } from "@/features/config/actions";
import { ConfigPromiseProvider } from "@/hooks/use-config-promise";
import { VisibilitySetting } from "../_components/visibility-setting";
import { YearSetting } from "../_components/year-setting";

export const metadata: Metadata = {
  title: "表示設定 - 配属発表",
};

const Page = async () => {
  const configPromise = getConfig();

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="space-y-6">
        <ConfigPromiseProvider value={configPromise}>
          <YearSetting />
          <VisibilitySetting />
        </ConfigPromiseProvider>
      </div>
    </div>
  );
};

export default Page;
