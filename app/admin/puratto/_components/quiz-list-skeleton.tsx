import { Skeleton } from "@/components/ui/skeleton";

export const QuizListSkeleton = () => {
  return (
    <div className="mask-b-to-60% mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 9 }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: Skeletons
        <Skeleton key={index} className="h-46 rounded-xl" />
      ))}
    </div>
  );
};
