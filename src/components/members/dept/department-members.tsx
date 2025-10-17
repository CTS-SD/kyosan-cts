import { Department } from "@/lib/db/schema";
import { getDepartmentIcon, getDepartmentStyles } from "@/lib/department";
import { cn } from "@/lib/utils";

type Props = {
  department: Department;
  students: {
    name: string;
    faculty: string;
  }[];
};

export const DepartmentMembers = ({ department, students }: Props) => {
  const deptIcon = getDepartmentIcon(department.name);
  const deptStyles = getDepartmentStyles(department.name);

  return (
    <div className="bg-background dark:bg-background/40 text-foreground px-4 py-6 shadow-lg sm:rounded-3xl">
      <div className="flex items-center justify-center gap-2.5 [&_svg]:size-6">
        <div className="text-foreground/50 dark:text-foreground/80">
          {deptIcon}
        </div>
        <div
          className={cn(
            "dark:text-foreground bg-clip-text text-2xl font-bold text-transparent",
            deptStyles,
          )}
        >
          {department.name}
        </div>
        <div className="text-foreground/50 dark:text-foreground/80 ml-1 font-bold">
          {students.length}名
        </div>
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {students.map((student) => (
          <div
            key={student.name}
            className={cn(
              "flex min-w-30 flex-col items-center rounded-full px-5 py-1 text-white shadow-md",
              deptStyles,
            )}
          >
            <div className="font-bold">{student.name}</div>
            <div className="-mt-1 text-sm font-semibold text-white/80">
              {student.faculty}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
