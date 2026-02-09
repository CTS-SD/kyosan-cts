import { redirect } from "next/navigation";
import { getUser } from "../lib/auth/actions";

type Props = {
  children: React.ReactNode;
  roles: string[];
  fallbackUrl?: string;
};

export const ProtectedRoute = async ({ children, roles, fallbackUrl = "/sign-in" }: Props) => {
  const user = await getUser();

  if (!user || !roles.includes(user.role)) {
    return redirect(fallbackUrl);
  }

  return <>{children}</>;
};
