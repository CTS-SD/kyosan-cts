import SideBar from "./Header";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="">
      <SideBar />
      {children}
    </div>
  );
};

export default Layout;
