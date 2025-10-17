import { auth } from "@/lib/auth";
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
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || !roles.includes(session.user.role)) {
    return redirect(fallbackUrl);
  }

  return <>{children}</>;
};
