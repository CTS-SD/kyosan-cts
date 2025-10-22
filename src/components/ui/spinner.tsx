import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

type Props = React.ComponentProps<typeof Loader2Icon> & {
  show?: boolean;
};

export const Spinner = ({ className, show, ...props }: Props) => {
  return (
    <Loader2Icon
      className={cn("animate-spin", !show && "hidden", className)}
      {...props}
    />
  );
};
