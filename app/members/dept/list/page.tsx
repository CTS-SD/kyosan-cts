import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { DepartmentMembers } from "@/app/members/dept/list/_components/department-members";
import { PdfDownloadButtonWrapper } from "@/app/members/dept/list/_components/pdf-download-button-wrapper";
import { getConfigValue } from "@/features/config/actions";
import { db } from "@/lib/db";
import { DepartmentTable, FacultyTable, StudentTable } from "@/lib/db/schema";

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
  const year = await getConfigValue("departmentAnnouncementsYear");

  if (departments.length === 0 || students.length === 0) {
    return notFound();
  }

  return (
    <div className="mx-auto max-w-xl py-6 sm:px-6">
      <div className="flex flex-col gap-4">
        {departments.map((department) => (
          <DepartmentMembers
            key={department.id}
            department={department}
            students={students.filter((student) => student.departmentId === department.id)}
          />
        ))}
      </div>
      <div className="my-10 flex justify-center">
        <PdfDownloadButtonWrapper departments={departments} students={students} year={year} />
      </div>
    </div>
  );
};

export default Page;
