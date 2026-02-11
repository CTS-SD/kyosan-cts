import { cn } from "../lib/utils";
import { UserIcon } from "./icons/user-icon";

export const UserAvatar = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div className={cn("size-10 overflow-clip rounded-full bg-accent", className)} {...props}>
      <UserIcon className="size-full" />
    </div>
  );
};
