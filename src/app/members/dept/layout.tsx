import { ThemeProvider } from "next-themes";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <ThemeProvider forcedTheme="light">
      <div data-theme="light">{children}</div>
    </ThemeProvider>
  );
};

export default Layout;
