import { notFound } from "next/navigation";
import { DepartmentMembers } from "@/app/members/dept/list/_components/department-members";
import { PdfDownloadButtonWrapper } from "@/app/members/dept/list/_components/pdf-download-button-wrapper";
import { getConfigValue } from "@/server/services/config";
import { getDepartments } from "@/server/services/departments";
import { getStudents } from "@/server/services/students";

const Page = async () => {
  const [departments, allStudents, year] = await Promise.all([
    getDepartments(),
    getStudents(),
    getConfigValue("departmentAnnouncementsYear"),
  ]);

  const students = allStudents.map((student) => ({
    name: student.name,
    faculty: student.faculty?.name ?? "",
    departmentId: student.departmentId,
  }));

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
