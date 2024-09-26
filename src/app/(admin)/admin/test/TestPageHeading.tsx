import { SettingsIcon } from "lucide-react";
import PageHeading from "../PageHeading";

type Props = {};

const TestPageHeading = ({}: Props) => {
  return (
    <PageHeading
      actions={[
        {
          icon: <SettingsIcon size={20} />,
          href: "/admin/test/options",
        },
      ]}
    >
      ぷらっとテスト
    </PageHeading>
  );
};

export default TestPageHeading;
