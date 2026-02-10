import { AppHeader } from "../../../components/app-header";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <AppHeader />
      <div className="min-h-dvh bg-brand-50 pt-16 dark:bg-background">{children}</div>
    </>
  );
};

export default Layout;
