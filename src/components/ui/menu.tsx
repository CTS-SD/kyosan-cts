"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Keep the same names/props as your Base UI wrappers where possible.
   Internally swap to Radix DropdownMenu primitives. */

const Menu = DropdownMenuPrimitive.Root;
const MenuPortal = DropdownMenuPrimitive.Portal;

function MenuTrigger(props: DropdownMenuPrimitive.DropdownMenuTriggerProps) {
  return <DropdownMenuPrimitive.Trigger data-slot="menu-trigger" {...props} />;
}

function MenuPopup({
  className,
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  ...props
}: DropdownMenuPrimitive.DropdownMenuContentProps & {
  alignOffset?: number;
}) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="menu-popup"
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        className={cn(
          "bg-popover z-50 max-h-96 min-w-32 overflow-y-auto rounded-lg border p-1 shadow-lg outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
          "data-[side=right]:slide-in-from-left-2 data-[side=left]:slide-in-from-right-2",
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

function MenuGroup(props: DropdownMenuPrimitive.DropdownMenuGroupProps) {
  return <DropdownMenuPrimitive.Group data-slot="menu-group" {...props} />;
}

function MenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: DropdownMenuPrimitive.DropdownMenuItemProps & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="menu-item"
      data-inset={inset ? "" : undefined}
      data-variant={variant}
      className={cn(
        "flex cursor-default items-center gap-2 rounded-sm px-2 py-1 text-base outline-none select-none",
        "data-disabled:pointer-events-none data-disabled:opacity-64",
        "data-highlighted:bg-accent data-highlighted:text-accent-foreground",
        "data-[variant=destructive]:text-destructive-foreground data-inset:ps-8",
        "sm:text-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function MenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: DropdownMenuPrimitive.DropdownMenuCheckboxItemProps) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="menu-checkbox-item"
      className={cn(
        "grid cursor-default grid-cols-[1rem_1fr] items-center gap-2 rounded-sm py-1 ps-2 pe-4 text-base outline-none",
        "data-disabled:pointer-events-none data-disabled:opacity-64",
        "data-highlighted:bg-accent data-highlighted:text-accent-foreground",
        "sm:text-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      checked={checked}
      {...props}
    >
      <DropdownMenuPrimitive.ItemIndicator className="col-start-1">
        <CheckIcon />
      </DropdownMenuPrimitive.ItemIndicator>
      <span className="col-start-2">{children}</span>
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

function MenuRadioGroup(
  props: DropdownMenuPrimitive.DropdownMenuRadioGroupProps,
) {
  return (
    <DropdownMenuPrimitive.RadioGroup data-slot="menu-radio-group" {...props} />
  );
}

function MenuRadioItem({
  className,
  children,
  ...props
}: DropdownMenuPrimitive.DropdownMenuRadioItemProps) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="menu-radio-item"
      className={cn(
        "grid cursor-default grid-cols-[1rem_1fr] items-center gap-2 rounded-sm py-1 ps-2 pe-4 text-base outline-none",
        "data-disabled:pointer-events-none data-disabled:opacity-64",
        "data-highlighted:bg-accent data-highlighted:text-accent-foreground",
        "sm:text-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <DropdownMenuPrimitive.ItemIndicator className="col-start-1">
        <CheckIcon />
      </DropdownMenuPrimitive.ItemIndicator>
      <span className="col-start-2">{children}</span>
    </DropdownMenuPrimitive.RadioItem>
  );
}

function MenuGroupLabel({
  className,
  inset,
  ...props
}: DropdownMenuPrimitive.DropdownMenuLabelProps & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="menu-label"
      data-inset={inset ? "" : undefined}
      className={cn(
        "text-muted-foreground px-2 py-1.5 text-xs font-medium data-inset:ps-9 sm:data-inset:ps-8",
        className,
      )}
      {...props}
    />
  );
}

function MenuSeparator({
  className,
  ...props
}: DropdownMenuPrimitive.DropdownMenuSeparatorProps) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="menu-separator"
      className={cn("bg-border mx-2 my-1 h-px", className)}
      {...props}
    />
  );
}

function MenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="menu-shortcut"
      className={cn(
        "text-muted-foreground/64 ms-auto text-xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
}

function MenuSub(props: DropdownMenuPrimitive.DropdownMenuSubProps) {
  return <DropdownMenuPrimitive.Sub data-slot="menu-sub" {...props} />;
}

function MenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: DropdownMenuPrimitive.DropdownMenuSubTriggerProps & { inset?: boolean }) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="menu-sub-trigger"
      data-inset={inset ? "" : undefined}
      className={cn(
        "flex items-center gap-2 rounded-sm px-2 py-1 text-base outline-none sm:text-sm",
        "data-disabled:pointer-events-none data-disabled:opacity-64",
        "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
        "data-highlighted:bg-accent data-highlighted:text-accent-foreground",
        "data-inset:ps-8 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ms-auto" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

function MenuSubPopup({
  className,
  sideOffset = 0,
  alignOffset = -4,
  // align = "start",
  ...props
}: DropdownMenuPrimitive.DropdownMenuSubContentProps & {
  alignOffset?: number;
}) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="menu-sub-content"
      // align={align}
      sideOffset={sideOffset}
      alignOffset={alignOffset}
      className={cn(
        "bg-popover z-50 max-h-96 min-w-32 overflow-y-auto rounded-lg border p-1 shadow-lg outline-none",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
        "data-[side=right]:slide-in-from-left-2 data-[side=left]:slide-in-from-right-2",
        className,
      )}
      {...props}
    />
  );
}

export {
  Menu,
  MenuCheckboxItem,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuPopup,
  MenuPortal,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubPopup,
  MenuSubTrigger,
  MenuTrigger,
};
