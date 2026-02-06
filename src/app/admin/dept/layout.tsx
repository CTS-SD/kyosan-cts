import { Suspense } from "react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <AdminPageHeader heading="配属発表" />
      <Suspense>{children}</Suspense>
    </>
  );
};

export default Layout;
