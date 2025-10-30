import { getSession } from "@/lib/auth/actions";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
  roles: string[];
  fallbackUrl?: string;
};

export const ProtectedRoute = async ({
  children,
  roles,
  fallbackUrl = "/sign-in",
}: Props) => {
  const session = await getSession();

  if (!session || !roles.includes(session.user.role)) {
    return redirect(fallbackUrl);
  }

  return <>{children}</>;
};
