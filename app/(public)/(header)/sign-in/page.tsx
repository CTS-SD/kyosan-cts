import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getUser } from "@/features/auth/actions";
import { auth } from "@/features/auth/server";
import { LoginForm } from "./_components/login-form";

const Page = async () => {
  const user = await getUser();

  const signOut = async () => {
    "use server";
    await auth.api.signOut({
      headers: await headers(),
    });
    redirect("/sign-in");
  };

  return <LoginForm onSignOut={signOut} userName={user?.name} />;
};

export default Page;
