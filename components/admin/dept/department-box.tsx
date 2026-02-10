import React from "react";
import type { Student } from "../../../lib/db/schema";
import { StudentItem } from "./student-item";

type Props = {
  name: string;
  students: Student[];
};

export const DepartmentBox = ({ name, students }: Props) => {
  const computedStudents = students.sort((a, b) => a.studentNumber.localeCompare(b.studentNumber));

  return (
    <section className="flex flex-col rounded-3xl">
      <div className="flex items-center gap-2 px-4 pt-2 pb-2.5">
        <h2 className="font-semibold text-muted-foreground">{name}</h2>
        <div className="text-muted-foreground">{students.length}名</div>
      </div>
      <div className="flex grow flex-col gap-0.5 rounded-3xl border bg-background p-1">
        {computedStudents.map((student) => (
          <React.Fragment key={student.id}>
            <StudentItem student={student} />
            <div className="mx-4 h-px rounded-full bg-border/60 last:hidden" />
          </React.Fragment>
        ))}
        {computedStudents.length === 0 && (
          <div className="flex justify-center py-8 text-muted-foreground text-sm">学生が登録されていません</div>
        )}
      </div>
    </section>
  );
};
