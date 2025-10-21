import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ResetMemberPassword } from "@/components/admin/settings/reset-member-password";

const Page = () => {
  return (
    <div>
      <AdminPageHeader heading="設定" />
      <div className="mx-auto max-w-2xl p-6">
        <ResetMemberPassword />
      </div>
    </div>
  );
};

export default Page;
