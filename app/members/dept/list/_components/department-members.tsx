import * as motion from "motion/react-client";
import { getDepartmentAsset } from "@/features/student/department";
import type { Department } from "@/lib/db/schema";
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
    <motion.section
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1 }}
      className="bg-background text-foreground shadow-lg sm:rounded-4xl sm:even:translate-x-12 sm:even:rotate-1 sm:odd:-translate-x-12 sm:odd:-rotate-1 dark:bg-background/40"
    >
      <div className="flex items-center justify-center gap-2.5 py-6">
        <div className="text-foreground/50 dark:text-foreground/80">
          <deptAsset.icon className="size-6" />
        </div>
        <h2 className={cn("bg-clip-text font-bold text-2xl text-transparent dark:text-foreground", deptAsset.styles)}>
          {department.name}
        </h2>
        <div className="ml-1 font-bold text-foreground/50 dark:text-foreground/80">{students.length}名</div>
      </div>
      <div className="p-1.5 pt-0">
        <ul className="flex flex-wrap justify-center gap-2 rounded-3xl bg-surface px-3 py-6">
          {students.map((student, i) => (
            <li
              key={`${department.id}-${i}`}
              className={cn(
                "flex min-w-30 flex-col items-center rounded-full border-3 border-border/40 px-5 py-1 text-white",
                deptAsset.styles,
              )}
            >
              <div className="font-bold">{student.name}</div>
              <div className="-mt-1 font-semibold text-white/80 text-xs">{student.faculty}</div>
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
};
