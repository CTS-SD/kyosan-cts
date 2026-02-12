import type * as React from "react";

import { cn } from "@/lib/utils";

function PlayfulInput({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full rounded-full border-[1.5px] bg-input/20 px-4 py-2 font-semibold text-base outline-0 ring-0",
        className,
      )}
      {...props}
    />
  );
}

export { PlayfulInput };
