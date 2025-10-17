import { Student } from "@/lib/db/schema";
import { StudentItem } from "./student-item";

type Props = {
  department: string;
  students: Student[];
};

export const DepartmentBox = ({ department, students }: Props) => {
  return (
    <div className="bg-muted/50 flex flex-col rounded-2xl border p-1">
      <div className="flex items-center gap-2 px-4 pt-2 pb-2.5">
        <div className="text-lg font-semibold">{department}</div>
        <div className="text-muted-foreground font-medium">
          {students.length}名
        </div>
      </div>
      <div className="bg-background grow rounded-xl border p-1">
        {students.map((student) => (
          <StudentItem key={student.id} student={student} />
        ))}
      </div>
    </div>
  );
};
