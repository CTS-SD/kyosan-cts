import { ImageUrlSetting } from "@/components/admin/dept/image-url-setting";
import { VisibilitySetting } from "@/components/admin/dept/visibility-setting";
import { YearSetting } from "@/components/admin/dept/year-setting";
import { ConfigPromiseProvider } from "@/ctx/config-promise";
import { getConfig } from "@/lib/config/actions";

const Page = async () => {
  const configPromise = getConfig();

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="space-y-6">
        <ConfigPromiseProvider value={configPromise}>
          <YearSetting />
          <ImageUrlSetting />
          <VisibilitySetting />
        </ConfigPromiseProvider>
      </div>
    </div>
  );
};

export default Page;
