"use client";

import { AddStudentButton } from "@/components/admin/dept/add-student-button";
import { DepartmentBox } from "@/components/admin/dept/department-box";
import { useDeptStore } from "@/providers/dept-store-provider";

const ClientView = () => {
  const { students, departments } = useDeptStore((store) => store);

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="flex justify-end">
        <AddStudentButton />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
    </div>
  );
};

export default ClientView;
