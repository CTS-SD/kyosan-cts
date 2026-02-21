import type { Metadata } from "next";
import { getConfig } from "@/features/config/actions";
import { ConfigPromiseProvider } from "@/features/config/hooks/use-config-promise";
import { QuestionCountSetting } from "./components/question-count-setting";

export const metadata: Metadata = {
  title: "出題設定 - ぷらっとテスト",
};

const Page = async () => {
  const configPromise = getConfig();

  return (
    <div className="mx-auto max-w-2xl p-6">
      <ConfigPromiseProvider value={configPromise}>
        <QuestionCountSetting />
      </ConfigPromiseProvider>
    </div>
  );
};

export default Page;
