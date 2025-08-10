type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="min-h-[100dvh] grid place-content-center">{children}</div>
  );
};

export default Layout;
