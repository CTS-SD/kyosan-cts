import { getDepartments } from "@/server/services/departments";
import { getStudents } from "@/server/services/students";
import { DepartmentBox } from "./department-box";
import { DepartmentGrid } from "./department-grid";

export const DepartmentBoxList = async () => {
  const [students, departments] = await Promise.all([getStudents(), getDepartments()]);

  return (
    <DepartmentGrid>
      {departments.map((department) => (
        <DepartmentBox
          key={department.id}
          department={department}
          students={students.filter((student) => student.departmentId === department.id)}
        />
      ))}
    </DepartmentGrid>
  );
};
