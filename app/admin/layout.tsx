import { AdminHeader } from "@/components/admin/admin-header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { SessionHeartbeat } from "@/components/session-heartbeat";
import { requireRole } from "@/lib/auth/actions";
import { redirectToSignIn } from "@/lib/auth/utils";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  await requireRole(["admin"], redirectToSignIn);

  return (
    <>
      <SessionHeartbeat />
      <div className="flex min-h-dvh flex-col bg-accent/50 pt-14 lg:flex-row lg:p-0">
        <AdminHeader />
        <AdminSidebar />
        <div className="grow">{children}</div>
      </div>
    </>
  );
};

export default Layout;
