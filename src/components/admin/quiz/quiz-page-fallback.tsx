import { Skeleton } from "@/components/ui/skeleton";

export const QuizPageFallback = () => {
  return (
    <div className="mx-auto max-w-5xl p-6">
      <Skeleton className="h-100 w-full mask-b-from-70%" />
    </div>
  );
};
