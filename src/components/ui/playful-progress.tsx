"use client";

import { Progress as ProgressPrimitive } from "radix-ui";
import type * as React from "react";

import { cn } from "@/lib/utils";

function PlayfulProgress({ className, value, ...props }: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn("relative flex h-3.75 w-full items-center overflow-x-hidden rounded-full bg-muted", className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="relative size-full flex-1 rounded-full bg-blue-400 transition-all duration-300 ease-gentle"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      >
        <div className="absolute top-0.75 right-2 left-2 h-0.75 rounded-full bg-white/20"></div>
      </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
  );
}

export { PlayfulProgress };
