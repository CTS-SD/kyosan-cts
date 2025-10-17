import { AdminHeader } from "@/components/admin/admin-header";
import { ProtectedRoute } from "@/components/protected-route";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  return (
    <ProtectedRoute roles={["admin"]} fallbackUrl="/sign-in?tab=admin">
      <AdminHeader />
      {children}
    </ProtectedRoute>
  );
};

export default Layout;
