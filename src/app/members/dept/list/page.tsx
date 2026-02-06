import { eq } from "drizzle-orm";
import { DownloadIcon, View } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DepartmentMembers } from "@/components/members/dept/department-members";
import { ListPdfDocument } from "@/components/members/dept/list-pdf-document";
import { PDFDownloadLink, PDFViewer } from "@/components/pdf-download-link";
import { Button } from "@/components/ui/button";
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
        <PDFDownloadLink
          document={<ListPdfDocument departments={departments} students={students} />}
          fileName="京産キャンスタ部署発表一覧"
        >
          <Button className="rounded-full">
            <DownloadIcon />
            PDFダウンロード
          </Button>
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default Page;
