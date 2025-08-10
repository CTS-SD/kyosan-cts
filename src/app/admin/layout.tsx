import { AdminHeader } from "@/components/admin/admin-header";
import { auth, redirectToAdminLogin } from "@/lib/auth";
import { headers } from "next/headers";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirectToAdminLogin();

  return (
    <>
      <AdminHeader />
      {children}
    </>
  );
};

export default Layout;
