import { AppHeader } from "@/components/app-header";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <AppHeader />
      {children}
    </div>
  );
};

export default Layout;
