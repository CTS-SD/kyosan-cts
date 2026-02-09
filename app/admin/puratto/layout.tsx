import { AdminPageHeader } from "../../../components/admin/admin-page-header";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <AdminPageHeader heading="ぷらっとテスト" />
      {children}
    </>
  );
};

export default Layout;
