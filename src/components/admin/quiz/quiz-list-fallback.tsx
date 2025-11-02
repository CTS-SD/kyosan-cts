import { Skeleton } from "@/components/ui/skeleton";

export const QuizListFallback = () => {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 mask-b-to-60% sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 9 }).map((_, index) => (
        <Skeleton key={index} className="h-[184px] rounded-xl" />
      ))}
    </div>
  );
};
