import SideBar from "./SideBar";

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
