import type * as React from "react";

import { cn } from "@/lib/utils";

function PlayfulInput({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn("w-full rounded-lg border-[1.5px] bg-input/20 px-3 py-2 font-semibold text-base", className)}
      {...props}
    />
  );
}

export { PlayfulInput };
