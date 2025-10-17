import { MembersHeader } from "@/components/members/members-header";
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
        <MembersHeader />
        {children}
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute roles={["admin", "member"]} fallbackUrl="/sign-in">
      <MembersHeader />
      {children}
    </ProtectedRoute>
  );
};

export default Layout;
