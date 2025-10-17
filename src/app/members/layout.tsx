import { MembersHeader } from "@/components/members/members-header";
import { ProtectedRoute } from "@/components/protected-route";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  return (
    <ProtectedRoute roles={["admin", "member"]} fallbackUrl="/sign-in">
      <MembersHeader />
      {children}
    </ProtectedRoute>
  );
};

export default Layout;
