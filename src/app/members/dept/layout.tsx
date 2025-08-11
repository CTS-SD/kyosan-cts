type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="blue-page min-h-[calc(100dvh-48px)] bg-blue-500 dark:bg-blue-900">
      {children}
    </div>
  );
};

export default Layout;
