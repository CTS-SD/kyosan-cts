import type * as React from "react";

import { cn } from "../../lib/utils";

function SettingRoot({ className, ...props }: React.ComponentProps<"form">) {
  return (
    <form
      className={cn("flex flex-col gap-4 overflow-clip rounded-3xl border bg-card shadow-xs", className)}
      {...props}
    ></form>
  );
}

function SettingHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-4 px-6 pt-5", className)} {...props}></div>;
}

function SettingTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("font-semibold text-lg", className)} {...props}></div>;
}

function SettingDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("text-xs", className)} {...props}></div>;
}

function SettingBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("px-6", className)} {...props}></div>;
}

function SettingFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className="p-1.5">
      <div
        className={cn("flex flex-col items-center gap-4 rounded-2xl bg-accent px-6 py-4 sm:flex-row", className)}
        {...props}
      ></div>
    </div>
  );
}

function SettingHint({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("font-medium text-muted-foreground text-xs", className)} {...props}></div>;
}

function SettingActions({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex gap-2 sm:ml-auto", className)} {...props}></div>;
}

export const Setting = {
  Root: SettingRoot,
  Header: SettingHeader,
  Title: SettingTitle,
  Description: SettingDescription,
  Body: SettingBody,
  Footer: SettingFooter,
  Hint: SettingHint,
  Actions: SettingActions,
};
