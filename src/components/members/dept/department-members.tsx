import type { Department } from "@/lib/db/schema";
import { getDepartmentAsset } from "@/lib/department";
import { cn } from "@/lib/utils";

type Props = {
  department: Department;
  students: {
    name: string;
    faculty: string;
  }[];
};

export const DepartmentMembers = ({ department, students }: Props) => {
  const deptAsset = getDepartmentAsset(department.name);

  return (
    <section className="bg-background px-4 py-6 text-foreground shadow-lg sm:rounded-3xl dark:bg-background/40">
      <div className="flex items-center justify-center gap-2.5 [&_svg]:size-6">
        <div className="text-foreground/50 dark:text-foreground/80">{deptAsset.icon}</div>
        <h2 className={cn("bg-clip-text font-bold text-2xl text-transparent dark:text-foreground", deptAsset.styles)}>
          {department.name}
        </h2>
        <div className="ml-1 font-bold text-foreground/50 dark:text-foreground/80">{students.length}名</div>
      </div>
      <ul className="mt-6 flex flex-wrap justify-center gap-2">
        {students.map((student) => (
          <li
            key={student.name}
            className={cn(
              "flex min-w-30 flex-col items-center rounded-full px-5 py-1 text-white shadow-md",
              deptAsset.styles,
            )}
          >
            <div className="font-bold">{student.name}</div>
            <div className="-mt-1 font-semibold text-sm text-white/80">{student.faculty}</div>
          </li>
        ))}
      </ul>
    </section>
  );
};
