import { AppHeader } from "../../components/app-header";
import { requireRole } from "../../lib/auth/actions";
import { getConfigValue } from "../../lib/config/actions";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const available = await getConfigValue("departmentAnnouncementsPublished");

  if (available) {
    await requireRole(["member", "admin"]);
  } else {
    await requireRole(["admin"]);
  }

  return (
    <>
      <AppHeader />
      <div className="pt-16">{children}</div>
    </>
  );
};

export default Layout;
