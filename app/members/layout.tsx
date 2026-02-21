import { AppHeader } from "@/app/(public)/(header)/_components/app-header";
import { requireRole } from "@/features/auth/actions";
import { SessionHeartbeat } from "@/features/auth/components/session-heartbeat";
import { redirectToSignIn } from "@/features/auth/utils";
import { getConfigValue } from "@/features/config/actions";

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
