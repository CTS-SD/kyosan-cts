import type { Metadata } from "next";
import { AppHeader } from "@/components/app-header";

export const metadata: Metadata = {
  title: {
    default: "京産キャンスタ",
    template: "%s | 京産キャンスタ",
  },
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AppHeader />
      <div className="min-h-dvh bg-surface pt-16 dark:bg-background">{children}</div>
    </>
  );
};

export default Layout;
