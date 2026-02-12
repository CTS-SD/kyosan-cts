import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type * as React from "react";
import { cn } from "@/lib/utils";

const playfulButtonVariants = cva(
  "flex select-none items-center justify-center gap-1.5 text-balance text-center font-semibold leading-tight transition-all duration-100 not-disabled:active:shadow-none *:[svg]:size-5",
  {
    variants: {
      variant: {
        solid: "text-white shadow-[0_3px_0] not-disabled:active:translate-y-[3px] dark:text-black",
        outline: "border-[1.5px] shadow-[0_3px_0] not-disabled:active:translate-y-[3px]",
      },
      tint: {
        default: "",
        red: "",
        green: "",
        blue: "",
        disabled: "",
      },
      size: {
        sm: "rounded-xl px-2.5 py-1.5 text-sm",
        md: "rounded-xl px-3 py-2.5 text-base",
      },
    },
    compoundVariants: [
      {
        variant: "solid",
        tint: "default",
        class: "bg-neutral-500 shadow-neutral-700",
      },
      {
        variant: "outline",
        tint: "default",
        class:
          "border-neutral-300 bg-background shadow-neutral-300 dark:border-neutral-800 dark:bg-muted/10 dark:shadow-neutral-800",
      },
      {
        variant: "solid",
        tint: "red",
        class: "bg-red-500 shadow-red-700 dark:bg-red-500/80 dark:shadow-red-700/80",
      },
      {
        variant: "outline",
        tint: "red",
        class:
          "border-red-300 bg-red-50 text-red-500 shadow-red-300 dark:border-red-400/50 dark:bg-red-500/10 dark:text-red-400 dark:shadow-red-400/50",
      },
      {
        variant: "solid",
        tint: "green",
        class: "bg-green-500 shadow-green-700 dark:bg-green-500/80 dark:shadow-green-700/80",
      },
      {
        variant: "outline",
        tint: "green",
        class:
          "border-green-300 bg-green-50 text-green-500 shadow-green-300 dark:border-green-400/50 dark:bg-green-500/10 dark:text-green-400 dark:shadow-green-400/50",
      },
      {
        variant: "solid",
        tint: "blue",
        class: "bg-blue-500 shadow-blue-700",
      },
      {
        variant: "outline",
        tint: "blue",
        class:
          "border-blue-300 bg-blue-50 text-blue-500 shadow-blue-300 dark:border-blue-400/50 dark:bg-blue-500/10 dark:text-blue-400 dark:shadow-blue-400/50",
      },
      {
        variant: "solid",
        tint: "disabled",
        class: "translate-y-0.5 bg-neutral-200 text-neutral-500 shadow-none dark:bg-neutral-800 dark:text-neutral-600",
      },
    ],
    defaultVariants: {
      variant: "solid",
      tint: "green",
      size: "md",
    },
  },
);

function PlayfulButton({
  className,
  variant = "solid",
  tint = "green",
  size = "md",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof playfulButtonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(playfulButtonVariants({ variant, tint, size, className }))}
      {...props}
    />
  );
}

export { PlayfulButton, playfulButtonVariants };
