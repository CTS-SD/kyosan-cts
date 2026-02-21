import { UserIcon } from "@/components/icons/user-icon";
import { cn } from "@/lib/utils";

export const UserAvatar = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div className={cn("size-10 overflow-clip rounded-full bg-accent", className)} {...props}>
      <UserIcon className="size-full" />
    </div>
  );
};
