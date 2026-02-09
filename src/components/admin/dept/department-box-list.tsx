"use client";

import { use } from "react";
import { useStudentBundlePromise } from "@/hooks/use-student-bundle-promise";
import { DepartmentBox } from "./department-box";

export const DepartmentBoxList = () => {
  const { students, departments } = use(useStudentBundlePromise());

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {departments.map((department) => (
        <DepartmentBox
          key={department.id}
          name={department.name}
          students={students.filter((student) => student.departmentId === department.id)}
        />
      ))}
    </div>
  );
};
