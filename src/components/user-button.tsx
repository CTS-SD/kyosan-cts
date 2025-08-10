import { auth } from "@/lib/auth";
import { UserRoundIcon } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { AdminUserButton } from "./admin/admin-user-button";
import { MemberUserButton } from "./members/member-user-button";
import { Button } from "./ui/button";

export const UserButton = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return (
      <Button asChild variant="outline" size="sm" className="rounded-full">
        <Link href="/sign-in">
          ログイン
        </Link>
      </Button>
    );
  }

  const user = session.user;

  if (user.role === "admin") {
    return <AdminUserButton user={user} />;
  } else if (user.role === "member") {
    return <MemberUserButton user={user} />;
  }

  return null;
};
