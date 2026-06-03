"use client";

import { InfoIcon } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export const FieldHeader = ({ className, ...props }: ComponentProps<"div">) => {
  return <div className={cn("flex w-fit items-center gap-1.5", className)} {...props} />;
};

type FieldNoticeProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  label?: string;
} & Pick<ComponentProps<typeof PopoverContent>, "align" | "side">;

export const FieldNotice = ({
  children,
  className,
  contentClassName,
  label = "説明を表示",
  align = "start",
  side = "top",
}: FieldNoticeProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          className={cn("text-muted-foreground", className)}
          aria-label={label}
        >
          <InfoIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align={align}
        side={side}
        className={cn(
          "block text-xs [&_a]:text-muted-foreground [&_a]:underline [&_a]:underline-offset-4",
          contentClassName,
        )}
      >
        {children}
      </PopoverContent>
    </Popover>
  );
};
