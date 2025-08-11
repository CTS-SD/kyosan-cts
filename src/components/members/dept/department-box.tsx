import { Department } from "@/lib/db/schema";

type Props = {
  department: Department;
  students: {
    name: string;
    faculty: string;
  }[];
};

export const DepartmentBox = ({ department, students }: Props) => {
  return (
    <div className="rounded-3xl border p-4 shadow-lg">
      <div className="text-xl font-bold text-center">{department.name}</div>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {students.map((student) => (
          <div
            key={student.name}
            className="flex min-w-30 flex-col items-center rounded-xl border px-4 py-0.5"
          >
            <div className="font-bold">{student.name}</div>
            <div className="text-foreground/60 -mt-0.75 text-sm">
              {student.faculty}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
