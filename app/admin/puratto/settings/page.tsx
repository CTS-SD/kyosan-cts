import type { Metadata } from "next";
import { getConfigValue } from "@/features/config/actions";
import { QuestionCountSetting } from "./_components/question-count-setting";

export const metadata: Metadata = {
  title: "出題設定 - ぷらっとテスト",
};

const Page = async () => {
  const count = await getConfigValue("purattoTestQuestionCount");

  return (
    <div className="mx-auto max-w-2xl p-6">
      <QuestionCountSetting initialCount={count} />
    </div>
  );
};

export default Page;
