import { AppHeader } from "@/components/app-header";
import { ProtectedRoute } from "@/components/protected-route";
import { getConfigValue } from "@/lib/config/actions";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const available = await getConfigValue("departmentAnnouncementsPublished");

  if (!available) {
    return (
      <ProtectedRoute roles={["admin"]} fallbackUrl="/">
        <AppHeader />
        {children}
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute roles={["admin", "member"]} fallbackUrl="/sign-in">
      <AppHeader />
      {children}
    </ProtectedRoute>
  );
};

export default Layout;
