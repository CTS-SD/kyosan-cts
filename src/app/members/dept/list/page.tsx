import { DepartmentMembers } from "@/components/members/dept/department-members";
import { Button } from "@/components/ui/button";
import { getConfig } from "@/lib/config/actions";
import { db } from "@/lib/db";
import { DepartmentTable, FacultyTable, StudentTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { ImageIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const Page = async () => {
  const { departmentAnnouncementsImageUrl: imageUrl } = await getConfig();
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
            students={students.filter(
              (student) => student.departmentId === department.id,
            )}
          />
        ))}
      </div>
      {imageUrl && (
        <div className="my-10 flex justify-center">
          <Button className="rounded-full" asChild>
            <Link href={imageUrl} target="_blank" rel="noreferrer">
              <ImageIcon />
              画像を保存
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Page;
