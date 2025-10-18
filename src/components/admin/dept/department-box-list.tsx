"use client";

import { useDeptStore } from "@/providers/dept-store-provider";
import { DepartmentBox } from "./department-box";

export const DepartmentBoxList = () => {
  const { students, departments } = useDeptStore((store) => store);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {departments.map((department) => (
        <DepartmentBox
          key={department.id}
          department={department.name}
          students={students.filter(
            (student) => student.departmentId === department.id,
          )}
        />
      ))}
    </div>
  );
};
