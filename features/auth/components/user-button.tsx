import Link from "next/link";
import { PlayfulButton } from "@/components/ui/playful-button";
import { getUser } from "@/features/auth/actions";
import { AdminUserButton } from "./admin-user-button";
import { MemberUserButton } from "./member-user-button";

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
