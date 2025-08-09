import { AdminHeader } from "@/components/admin/admin-header";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <AdminHeader />
      {children}
    </>
  );
};

export default Layout;
