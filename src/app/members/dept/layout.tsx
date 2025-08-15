import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="from-background min-h-[calc(100dvh-48px)] bg-gradient-to-b via-cyan-300 via-10% to-blue-700 dark:via-none dark:to-blue-900">
      <div className="mx-auto max-w-5xl p-4 px-4">
        <Link
          href="/members/dept"
          className="dark:from-primary dark:text-primary-foreground dark:to-primary w-fit bg-gradient-to-br from-cyan-400 to-blue-600 px-3 py-1 text-sm font-semibold text-white"
        >
          配属発表2025
        </Link>
      </div>
      {children}
    </div>
  );
};

export default Layout;
