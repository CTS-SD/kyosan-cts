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
        default:
          "bg-[var(--tint)] shadow-[0_3px_0] shadow-[color:var(--tint-heavy)]",
        outline:
          "border shadow-[0_2px_0] border-[var(--tint)] shadow-[color:var(--tint)] bg-[var(--tint-light)]",
      },
      tint: {
        default:
          "[--tint-light:transparent] [--tint:var(--color-neutral-300)] [--tint-heavy:var(--color-neutral-400)]",
        green:
          "[--tint-light:var(--color-green-100)] [--tint:var(--color-green-300)] [--tint-heavy:var(--color-green-400)]",
        blue: "[--tint-light:var(--color-blue-100)] [--tint:var(--color-blue-300)] [--tint-heavy:var(--color-blue-400)]",
        red: "[--tint-light:var(--color-red-100)] [--tint:var(--color-red-300)] [--tint-heavy:var(--color-red-600)]",
      },
    },
    defaultVariants: {
      variant: "default",
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
