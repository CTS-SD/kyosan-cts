import { AppHeader } from "@/components/app-header";
import { SessionHeartbeat } from "@/components/session-heartbeat";
import { requireRole } from "@/lib/auth/actions";
import { redirectToSignIn } from "@/lib/auth/utils";
import { getConfigValue } from "@/lib/config/actions";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const isPublished = await getConfigValue("departmentAnnouncementsPublished");

  if (isPublished) {
    await requireRole(["member", "admin"], redirectToSignIn);
  } else {
    await requireRole(["admin"], redirectToSignIn);
  }

  return (
    <>
      <SessionHeartbeat />
      <AppHeader />
      <div className="pt-16">{children}</div>
    </>
  );
};

export default Layout;
