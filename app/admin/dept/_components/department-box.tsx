import React from "react";
import { departmentGradientStyle } from "@/features/departments/assets";
import type { Department, Student } from "@/features/students/types";
import { DepartmentActions } from "./department-actions";
import { StudentItem } from "./student-item";

type Props = {
  department: Department;
  students: Student[];
};

export const DepartmentBox = ({ department, students }: Props) => {
  const computedStudents = students.sort((a, b) => a.studentNumber.localeCompare(b.studentNumber));

  return (
    <section className="flex flex-col rounded-3xl p-1.5">
      <div className="flex items-center">
        <div className="flex h-full items-center gap-3 rounded-t-2xl bg-accent px-4 pt-2 pb-1">
          <span
            className="size-3 shrink-0 rounded-full border-2 border-border/40"
            style={{ ...departmentGradientStyle(department.color) }}
          />
          <h2 className="font-semibold">{department.name}</h2>
          <div className="font-medium text-muted-foreground text-sm">{students.length}名</div>
        </div>
        <DepartmentActions department={department} studentCount={students.length} />
      </div>
      <div className="flex grow flex-col rounded-b-3xl rounded-tr-3xl bg-accent p-1">
        <div className="flex grow flex-col gap-0.5 rounded-2xl border bg-background p-1">
          {computedStudents.map((student) => (
            <React.Fragment key={student.id}>
              <StudentItem student={student} />
              <div className="mx-3 h-px rounded-full bg-border/60 last:hidden" />
            </React.Fragment>
          ))}
          {computedStudents.length === 0 && (
            <div className="flex size-full items-center justify-center">
              <div className="py-12">
                <div className="text-muted-foreground">学生が登録されていません。</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
