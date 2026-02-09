import { AppHeader } from "../../../components/app-header";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <AppHeader />
      <div className="mx-auto max-w-5xl px-6">{children}</div>
    </>
  );
};

export default Layout;
