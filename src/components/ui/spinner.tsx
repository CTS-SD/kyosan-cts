import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

type Props = React.ComponentProps<typeof Loader2Icon>;

export const Spinner = ({ className, ...props }: Props) => {
  return <Loader2Icon className={cn("animate-spin", className)} {...props} />;
};
