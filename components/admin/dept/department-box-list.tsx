import { getDepartments, getFaculties, getStudents } from "../../../lib/students";
import { DepartmentBox } from "./department-box";

export const DepartmentBoxList = async () => {
  const [students, departments, faculties] = await Promise.all([getStudents(), getDepartments(), getFaculties()]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {departments.map((department) => (
        <DepartmentBox
          key={department.id}
          name={department.name}
          students={students.filter((student) => student.departmentId === department.id)}
          faculties={faculties}
          departments={departments}
        />
      ))}
    </div>
  );
};
