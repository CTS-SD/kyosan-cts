import Link from "next/link";
import { getUser } from "@/lib/auth/actions";
import { AdminUserButton } from "./admin/admin-user-button";
import { MemberUserButton } from "./members/member-user-button";
import { PlayfulButton } from "./ui/playful-button";

export const UserButton = async () => {
  const user = await getUser();

  if (!user) {
    return <LoginButton />;
  }

  if (user.role === "admin") {
    return <AdminUserButton />;
  } else if (user.role === "member") {
    return <MemberUserButton />;
  }

  return <LoginButton />;
};

const LoginButton = () => {
  return (
    <PlayfulButton tint="blue" variant="outline" className="rounded-full" size="sm" asChild>
      <Link href="/sign-in">ログイン</Link>
    </PlayfulButton>
  );
};
