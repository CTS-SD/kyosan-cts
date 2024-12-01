import { SettingsIcon } from "lucide-react";
import PageHeading from "../PageHeading";

const TestPageHeading = () => {
  return (
    <PageHeading
      heading="ぷらっとテスト"
      href="/admin/test"
      actions={[
        {
          icon: <SettingsIcon size={20} />,
          href: "/admin/test/options",
        },
      ]}
    />
  );
};

export default TestPageHeading;
