import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const playfulButtonVariants = cva(
  "select-none not-disabled:active:shadow-none flex justify-center text-balance leading-tight text-center font-bold transition-all duration-100 not-disabled:active:translate-y-0.5",
  {
    variants: {
      variant: {
        solid: "bg-[var(--tint)] shadow-[0_3px_0] text-white dark:text-black",
        outline: "border shadow-[0_2px_0]",
      },
      tint: {
        default: "",
        red: "",
        green: "",
        blue: "",
      },
      size: {
        sm: "text-sm py-1.5 px-2.5 rounded-lg",
        md: "text-base py-2.5 px-3 rounded-lg",
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
        class: "border-neutral-300 shadow-neutral-300 dark:border-neutral-800 dark:shadow-neutral-800 dark:bg-muted/10",
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
          "border-red-300 shadow-red-300 bg-red-50 text-red-500 dark:bg-red-500/10 dark:border-red-400/50 dark:shadow-red-400/50 dark:text-red-400",
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
          "border-green-300 shadow-green-300 bg-green-50 text-green-500 dark:bg-green-500/10 dark:border-green-400/50 dark:shadow-green-400/50 dark:text-green-400",
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
          "border-blue-300 shadow-blue-300 bg-blue-50 text-blue-500 dark:bg-blue-500/10 dark:border-blue-400/50 dark:shadow-blue-400/50 dark:text-blue-400",
      },
    ],
    defaultVariants: {
      variant: "solid",
      tint: "green",
      size: "md",
    },
  },
);

interface ButtonProps extends useRender.ComponentProps<"button"> {
  variant?: VariantProps<typeof playfulButtonVariants>["variant"];
  tint?: VariantProps<typeof playfulButtonVariants>["tint"];
  size?: VariantProps<typeof playfulButtonVariants>["size"];
}

function PlayfulButton({ className, variant, tint, size, render, ...props }: ButtonProps) {
  const typeValue: React.ButtonHTMLAttributes<HTMLButtonElement>["type"] = render ? undefined : "button";

  const defaultProps = {
    "data-slot": "button",
    className: cn(playfulButtonVariants({ tint, variant, size, className })),
    type: typeValue,
  };

  return useRender({
    defaultTagName: "button",
    render,
    props: mergeProps<"button">(defaultProps, props),
  });
}

export { PlayfulButton, playfulButtonVariants };
