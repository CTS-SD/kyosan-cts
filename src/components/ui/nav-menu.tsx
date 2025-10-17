import { cn } from "@/lib/utils";
import Link from "next/link";

function NavMenu({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav className={cn("flex items-center gap-1", className)} {...props} />
  );
}

function NavLink({ className, ...props }: React.ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "hover:bg-accent data-[active=true]:bg-accent/50 rounded-sm px-2 py-1.5 text-sm font-semibold transition-colors",
        className,
      )}
      {...props}
    />
  );
}

export { NavLink, NavMenu };
