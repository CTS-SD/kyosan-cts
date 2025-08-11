import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { DepartmentTable, StudentTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

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
    <div className="mx-auto max-w-5xl p-6">
      <div>{student.name}さんの配属部署は...</div>
      <div className="transition-all delay-1000 starting:opacity-0">
        {department.name}です!
      </div>
      <Button asChild variant="link">
        <Link href="/members/dept/list">
          配属部署一覧を見る
          <ArrowRightIcon />
        </Link>
      </Button>
    </div>
  );
};

export default Page;
