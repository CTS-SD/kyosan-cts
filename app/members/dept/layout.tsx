import Link from "next/link";
import { getConfigValue } from "../../../lib/config/actions";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const year = await getConfigValue("departmentAnnouncementsYear");

  return (
    <div className="min-h-[calc(100dvh-48px)] bg-gradient-to-b from-background via-10% via-cyan-300 to-blue-700 dark:via-none dark:to-blue-900">
      <div className="flex justify-center p-6 pb-0">
        <Link
          href="/members/dept"
          className="w-fit bg-gradient-to-br from-cyan-400 to-blue-600 px-3 py-1 font-black text-3xl text-white italic dark:from-primary dark:to-primary dark:text-primary-foreground"
        >
          配属発表{year}
        </Link>
      </div>
      {children}
    </div>
  );
};

export default Layout;
