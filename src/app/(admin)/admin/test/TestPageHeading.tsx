import { SettingsIcon } from "lucide-react";
import PageHeading from "../PageHeading";

type Props = {};

const TestPageHeading = ({}: Props) => {
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
