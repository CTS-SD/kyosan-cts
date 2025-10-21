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
    return <AdminUserButton />;
  } else if (user.role === "member") {
    return <MemberUserButton />;
  }

  return <LoginButton />;
};

const LoginButton = () => {
  return (
    <Button
      render={<Link href="/sign-in">ログイン</Link>}
      variant="outline"
      size="sm"
      className="rounded-full"
    ></Button>
  );
};
