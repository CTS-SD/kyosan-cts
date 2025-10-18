import { Skeleton } from "@/components/ui/skeleton";

export const DepartmentBoxListFallback = () => {
  return (
    <div className="grid grid-cols-1 gap-4 mask-b-from-60% sm:grid-cols-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-60" />
      ))}
    </div>
  );
};
