import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { ProtectedRoute } from "@/components/protected-route";
import { SidebarProvider } from "@/components/ui/sidebar";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  return (
    <ProtectedRoute roles={["admin"]} fallbackUrl="/sign-in">
      <SidebarProvider>
        <AdminSidebar />
        <div className="grow">{children}</div>
      </SidebarProvider>
    </ProtectedRoute>
  );
};

export default Layout;
