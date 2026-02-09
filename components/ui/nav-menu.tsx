import Link from "next/link";
import { cn } from "../../lib/utils";

function NavMenu({ className, ...props }: React.ComponentProps<"nav">) {
  return <nav className={cn("flex items-center gap-1", className)} {...props} />;
}

function NavLink({ className, ...props }: React.ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "rounded-sm px-2 py-1.5 font-semibold text-sm transition-colors hover:bg-accent data-[active=true]:bg-accent/50",
        className,
      )}
      {...props}
    />
  );
}

export { NavLink, NavMenu };
