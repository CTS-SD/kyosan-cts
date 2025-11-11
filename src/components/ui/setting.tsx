import * as React from "react";

import { cn } from "@/lib/utils";

function SettingRoot({ className, ...props }: React.ComponentProps<"form">) {
  return <form className={cn("flex flex-col gap-4 overflow-clip rounded-lg border", className)} {...props}></form>;
}

function SettingHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-4 px-6 pt-6", className)} {...props}></div>;
}

function SettingTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("text-lg font-bold", className)} {...props}></div>;
}

function SettingDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("text-sm", className)} {...props}></div>;
}

function SettingBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("px-6", className)} {...props}></div>;
}

function SettingFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("bg-muted/50 flex flex-col items-center gap-4 border-t px-6 py-4 sm:flex-row", className)}
      {...props}
    ></div>
  );
}

function SettingHint({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("text-muted-foreground text-sm", className)} {...props}></div>;
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
