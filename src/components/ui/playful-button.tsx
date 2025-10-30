import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const playfulButtonVariants = cva(
  "px-3 select-none py-2.5 not-disabled:active:shadow-none flex justify-center rounded-lg leading-tight text-start font-semibold transition-all duration-50 not-disabled:active:translate-y-0.5",
  {
    variants: {
      variant: {
        solid: "bg-[var(--tint)] shadow-[0_3px_0] text-white",
        outline: "border shadow-[0_2px_0]",
      },
      tint: {
        default: "",
        red: "",
        green: "",
        blue: "",
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
        class: "border-neutral-300 shadow-neutral-300",
      },
      {
        variant: "solid",
        tint: "red",
        class: "bg-red-500 shadow-red-700",
      },
      {
        variant: "solid",
        tint: "green",
        class: "bg-green-500 shadow-green-700",
      },
      {
        variant: "solid",
        tint: "blue",
        class: "bg-blue-500 shadow-blue-700",
      },
      {
        variant: "outline",
        tint: "blue",
        class: "border-blue-300 shadow-blue-300 bg-blue-50 text-blue-500",
      },
    ],
    defaultVariants: {
      variant: "solid",
      tint: "green",
    },
  },
);

interface ButtonProps extends useRender.ComponentProps<"button"> {
  variant?: VariantProps<typeof playfulButtonVariants>["variant"];
  tint?: VariantProps<typeof playfulButtonVariants>["tint"];
}

function PlayfulButton({
  className,
  variant,
  tint,
  render,
  ...props
}: ButtonProps) {
  const typeValue: React.ButtonHTMLAttributes<HTMLButtonElement>["type"] =
    render ? undefined : "button";

  const defaultProps = {
    "data-slot": "button",
    className: cn(playfulButtonVariants({ tint, variant, className })),
    type: typeValue,
  };

  return useRender({
    defaultTagName: "button",
    render,
    props: mergeProps<"button">(defaultProps, props),
  });
}

export { PlayfulButton, playfulButtonVariants };
