import { ConfigPromiseProvider } from "@/hooks/use-config-promise";
import { getConfig } from "@/lib/config/actions";
import { QuestionCountSetting } from "./components/question-count-setting";

const Page = () => {
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
