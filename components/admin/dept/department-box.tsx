import type { Student } from "../../../lib/db/schema";
import { StudentItem } from "./student-item";

type Props = {
  name: string;
  students: Student[];
};

export const DepartmentBox = ({ name, students }: Props) => {
  const computedStudents = students.sort((a, b) => a.studentNumber.localeCompare(b.studentNumber));

  return (
    <section className="flex flex-col rounded-2xl border bg-muted/50 p-1">
      <div className="flex items-center gap-2 px-4 pt-2 pb-2.5">
        <h2 className="font-semibold text-muted-foreground text-sm">{name}</h2>
        <div className="text-muted-foreground text-sm">{students.length}名</div>
      </div>
      <div className="grow rounded-xl border bg-background p-1">
        {computedStudents.map((student) => (
          <StudentItem key={student.id} student={student} />
        ))}
      </div>
    </section>
  );
};
