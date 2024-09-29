import React, { useState } from "react";
import { cn } from "@/utils/utils";
import { cva, type VariantProps } from "class-variance-authority";

const multiSwitchVariants = cva();

export interface MultiSwitchProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof multiSwitchVariants> {
  value?: string;
  onValueChange?: (value: string) => void;
}

const MultiSwitch = ({
  className,
  value,
  onValueChange,
  ...props
}: MultiSwitchProps) => {
  return (
    <div
      className={cn("flex gap-0.5 rounded-md border p-1", className)}
      {...props}
    >
      {React.Children.map(props.children, (child) => {
        if (React.isValidElement<MultiSwitchItemProps>(child)) {
          return React.cloneElement(child, {
            isActive: child.props.value === value,
            onClick: () => onValueChange && onValueChange(child.props.value),
          });
        }
        return child;
      })}
    </div>
  );
};

export interface MultiSwitchItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof multiSwitchVariants> {
  value: string;
  isActive?: boolean;
}

const MultiSwitchItem = ({
  className,
  isActive,
  ...props
}: MultiSwitchItemProps) => {
  return (
    <div
      className={cn(
        "flex flex-1 cursor-pointer justify-center rounded-sm p-1.5 text-sm font-semibold",
        isActive ? "bg-neutral-200/80" : "text-neutral-500",
        className,
      )}
      {...props}
    />
  );
};

export { MultiSwitch, MultiSwitchItem };
