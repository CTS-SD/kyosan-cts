import { cn } from "@/lib/utils";

export const QuizSessionRoot = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn("mx-auto flex h-full max-w-xl grow flex-col overflow-auto bg-background", className)}
      {...props}
    />
  );
};

export const QuizSessionHeader = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn("sticky top-0 z-10 flex h-12 shrink-0 items-center gap-2 bg-background px-4", className)}
      {...props}
    />
  );
};

export const QuizSession = {
  Root: QuizSessionRoot,
  Header: QuizSessionHeader,
};
