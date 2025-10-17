import { PublicHeader } from "@/components/public-header";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <PublicHeader />
      {children}
    </div>
  );
};

export default Layout;
