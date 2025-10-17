import { db } from "@/lib/db";
import { DepartmentTable, StudentTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ClientView } from "./client-view";

type Props = {
  params: Promise<{ studentNumber: string }>;
};

const Page = async ({ params }: Props) => {
  const { studentNumber } = await params;

  const [data] = await db
    .select({
      student: StudentTable,
      department: DepartmentTable,
    })
    .from(StudentTable)
    .innerJoin(
      DepartmentTable,
      eq(DepartmentTable.id, StudentTable.departmentId),
    )
    .where(eq(StudentTable.studentNumber, studentNumber))
    .limit(1)
    .execute();

  if (!data) {
    return notFound();
  }

  const { student, department } = data;

  return (
    <ClientView studentName={student.name} departmentName={department.name} />
  );
};

export default Page;
