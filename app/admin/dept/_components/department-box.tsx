import React from "react";
import type { Department, Faculty, Student } from "@/features/students/types";
import { DepartmentActions } from "./department-actions";
import { StudentItem } from "./student-item";

type Props = {
  department: Department;
  students: Student[];
  faculties: Faculty[];
  departments: Department[];
};

export const DepartmentBox = ({ department, students, faculties, departments }: Props) => {
  const computedStudents = students.sort((a, b) => a.studentNumber.localeCompare(b.studentNumber));

  return (
    <section className="flex flex-col rounded-3xl bg-accent p-1.5">
      <div className="flex items-center gap-2 px-4 pt-1 pb-2">
        <span className="size-3 shrink-0 rounded-full" style={{ backgroundColor: department.color }} />
        <h2 className="font-semibold text-muted-foreground">{department.name}</h2>
        <div className="text-muted-foreground">{students.length}名</div>
        <DepartmentActions department={department} studentCount={students.length} />
      </div>
      <div className="flex grow flex-col gap-0.5 rounded-2xl border bg-background p-1">
        {computedStudents.map((student) => (
          <React.Fragment key={student.id}>
            <StudentItem student={student} faculties={faculties} departments={departments} />
            <div className="mx-3 h-px rounded-full bg-border/60 last:hidden" />
          </React.Fragment>
        ))}
        {computedStudents.length === 0 && (
          <div className="flex justify-center py-8 text-muted-foreground text-sm">学生が登録されていません</div>
        )}
      </div>
    </section>
  );
};
