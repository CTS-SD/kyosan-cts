import { cn } from "@/utils/utils";

type Props = {
  size?: number;
  className?: string;
};

const Spinner = ({ size = 20, className = "black" }: Props) => {
  return (
    <div
      className="relative"
      style={{
        width: size,
        height: size,
      }}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className={cn("absolute")}
          style={{
            width: size,
            height: size,
            transform: `rotate(${i * 30}deg) translateY(50%)`,
          }}
        >
          <div
            className={cn(
              "rounded-full -translate-y-1/2 animate-spinner-bar",
              className
            )}
            style={{
              width: size / 4,
              height: size / 12,
              animationDelay: `${-(12 - i) * (3 / 24)}s`,
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export { Spinner };
