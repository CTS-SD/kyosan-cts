import type { Metadata } from "next";
import { AdminHeader } from "@/app/admin/_components/admin-header";
import { AdminSidebar } from "@/app/admin/_components/admin-sidebar";
import { requireRole } from "@/features/auth/actions";
import { SessionHeartbeat } from "@/features/auth/components/session-heartbeat";
import { redirectToSignIn } from "@/features/auth/utils";

export const metadata: Metadata = {
  title: {
    default: "京産キャンスタ 管理者",
    template: "%s | 京産キャンスタ 管理者",
  },
};

const Layout = async ({ children }: { children: React.ReactNode }) => {
  await requireRole(["admin"], redirectToSignIn);

  return (
    <>
      <SessionHeartbeat />
      <div className="flex min-h-dvh flex-col bg-accent/50 pt-14 lg:flex-row lg:p-0">
        <AdminHeader />
        <AdminSidebar />
        <div className="grow">{children}</div>
      </div>
    </>
  );
};

export default Layout;
