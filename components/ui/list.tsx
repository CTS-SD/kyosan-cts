import { Item } from "@/components/ui/item";
import { cn } from "@/lib/utils";

export const List = ({ className, ...props }: React.ComponentProps<"div">) => {
  return <div className={cn("flex flex-col rounded-3xl bg-card px-5", className)} {...props}></div>;
};

export const ListItem = ({ className, ...props }: React.ComponentProps<typeof Item>) => {
  return (
    <Item
      className={cn("rounded-none border-border border-t-0 border-r-0 border-l-0 px-0 last:border-0", className)}
      {...props}
    />
  );
};
