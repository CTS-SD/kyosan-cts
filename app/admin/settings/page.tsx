import type { Metadata } from "next";
import { ResetMemberPassword } from "@/app/admin/settings/_components/reset-member-password";

export const metadata: Metadata = {
  title: "設定",
};

const Page = async () => {
  return (
    <div className="mx-auto max-w-2xl p-6">
      <ResetMemberPassword />
    </div>
  );
};

export default Page;
