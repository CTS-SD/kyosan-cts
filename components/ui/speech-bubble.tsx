import { cn } from "@/lib/utils";

export const SpeechBubble = ({
  direction = "right",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  direction?: "left" | "right";
}) => {
  return (
    <div
      className={cn("relative h-fit w-fit rounded-3xl border bg-card px-3.5 py-3 text-sm leading-normal", className)}
      {...props}
    >
      <div className="flex items-start gap-0.5">{children}</div>
      {direction === "right" ? (
        <div className="absolute -bottom-0.5 -left-1 h-2.5 w-3.5 rotate-45">
          <div
            aria-hidden="true"
            className="bottom-0 h-2.5 w-3.5 bg-border"
            style={{
              clipPath: "polygon(0px 0%, 50% 100%, 100% 0%)",
            }}
          ></div>
          <div
            aria-hidden="true"
            className="absolute bottom-0.75 h-2.5 w-3.5 bg-card"
            style={{
              clipPath: "polygon(0px 0%, 50% 100%, 100% 0%)",
            }}
          />
        </div>
      ) : (
        <div className="absolute -right-1 -bottom-0.5 h-2.5 w-3.5 -rotate-45">
          <div
            aria-hidden="true"
            className="bottom-0 h-2.5 w-3.5 bg-border"
            style={{
              clipPath: "polygon(0px 0%, 50% 100%, 100% 0%)",
            }}
          ></div>
          <div
            aria-hidden="true"
            className="absolute bottom-0.75 h-2.5 w-3.5 bg-card"
            style={{
              clipPath: "polygon(0px 0%, 50% 100%, 100% 0%)",
            }}
          />
        </div>
      )}
    </div>
  );
};
