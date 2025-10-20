import { cn } from "@/lib/utils";
import { User } from "better-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type Props = React.ComponentProps<typeof Avatar> & {
  user: User;
};

export const UserAvatar = ({ user, className, ...props }: Props) => {
  return (
    <Avatar className={cn("select-none", className)} {...props}>
      <AvatarImage src={user.image ?? ""} />
      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
    </Avatar>
  );
};
