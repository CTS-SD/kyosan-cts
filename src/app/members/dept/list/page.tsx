import { DepartmentMembers } from "@/components/members/dept/department-members";
import { db } from "@/lib/db";
import { DepartmentTable, FacultyTable, StudentTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

const Page = async () => {
  const departments = await db.select().from(DepartmentTable);
  const students = await db
    .select({
      name: StudentTable.name,
      faculty: FacultyTable.name,
      departmentId: StudentTable.departmentId,
    })
    .from(StudentTable)
    .innerJoin(FacultyTable, eq(FacultyTable.id, StudentTable.facultyId))
    .execute();

  if (departments.length === 0 || students.length === 0) {
    return notFound();
  }

  return (
    <div className="mx-auto max-w-xl p-6">
      <div className="">
        <h1 className="text-center text-3xl font-bold text-foreground">配属発表</h1>
      </div>
      <div className="mt-6 flex flex-col gap-4">
        {departments.map((department) => (
          <DepartmentMembers
            key={department.id}
            department={department}
            students={students.filter(
              (student) => student.departmentId === department.id,
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
