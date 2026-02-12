import { AdminHeader } from "@/components/admin/admin-header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { ProtectedRoute } from "@/components/protected-route";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  return (
    <ProtectedRoute roles={["admin"]} fallbackUrl="/sign-in">
      <div className="flex min-h-dvh flex-col bg-accent/50 pt-14 lg:flex-row lg:p-0">
        <AdminHeader />
        <AdminSidebar />
        <div className="grow">{children}</div>
      </div>
    </ProtectedRoute>
  );
};

export default Layout;
