import { getDepartments } from "@/server/services/departments";
import { getFaculties } from "@/server/services/faculties";
import { getStudents } from "@/server/services/students";
import { AddDepartmentButton } from "./add-department-button";
import { DepartmentBox } from "./department-box";
import { DepartmentGrid } from "./department-grid";

export const DepartmentBoxList = async () => {
  const [students, departments, faculties] = await Promise.all([getStudents(), getDepartments(), getFaculties()]);

  const counts = Object.fromEntries(
    departments.map((department) => [
      department.id,
      students.filter((student) => student.departmentId === department.id).length,
    ]),
  );

  return (
    <DepartmentGrid departments={departments} counts={counts} addButton={<AddDepartmentButton />}>
      {departments.map((department) => (
        <DepartmentBox
          key={department.id}
          department={department}
          students={students.filter((student) => student.departmentId === department.id)}
          faculties={faculties}
          departments={departments}
        />
      ))}
    </DepartmentGrid>
  );
};
