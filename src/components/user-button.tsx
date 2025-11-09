import { getSession } from "@/lib/auth/actions";
import Link from "next/link";
import { AdminUserButton } from "./admin/admin-user-button";
import { MemberUserButton } from "./members/member-user-button";
import { Button } from "./ui/button";

export const UserButton = async () => {
  const session = await getSession();

  if (!session) {
    return <LoginButton />;
  }

  const user = session.user;

  if (user.role === "admin") {
    return (
      <div className="flex items-center gap-2">
        <Button size="sm" variant="link" asChild>
          <Link href="/admin/puratto">管理者</Link>
        </Button>
        <AdminUserButton />
      </div>
    );
  } else if (user.role === "member") {
    return <MemberUserButton />;
  }

  return <LoginButton />;
};

const LoginButton = () => {
  return (
    <Button className="rounded-full" size="sm" asChild>
      <Link href="/sign-in">ログイン</Link>
    </Button>
  );
};
