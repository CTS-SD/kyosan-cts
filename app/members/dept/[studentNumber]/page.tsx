import { eq } from "drizzle-orm";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getDepartmentAsset } from "@/features/student/department";
import { db } from "@/lib/db";
import { DepartmentTable, StudentTable } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { Confetti } from "./_components/confetti";

const Page = async ({ params }: { params: Promise<{ studentNumber: string }> }) => {
  const { studentNumber } = await params;

  const [data] = await db
    .select({
      student: StudentTable,
      department: DepartmentTable,
    })
    .from(StudentTable)
    .innerJoin(DepartmentTable, eq(DepartmentTable.id, StudentTable.departmentId))
    .where(eq(StudentTable.studentNumber, studentNumber))
    .limit(1)
    .execute();

  if (!data) {
    return notFound();
  }

  const { student, department } = data;

  const deptAsset = getDepartmentAsset(department.name);

  return (
    <>
      <Confetti delay={6800} />
      <div className="mx-auto max-w-lg p-6 pt-10 sm:pt-20">
        <div className="flex flex-col items-center rounded-3xl p-4 text-white">
          <div className="flex select-none flex-col items-center gap-6 font-semibold text-2xl">
            <div className="flex starting:translate-y-2 items-baseline starting:opacity-0 starting:blur-xs transition delay-1000 duration-600 ease-out">
              <div className="bg-white font-bold text-4xl text-black shadow-xl">{student.name}</div>
              <div className="ml-2">さんの</div>
            </div>
            <div className="flex items-baseline font-bold text-3xl *:starting:opacity-0 *:transition">
              <div className="transition delay-2000 duration-600">配属先は</div>
              <div className="flex *:starting:translate-y-2 *:starting:opacity-0 *:transition *:duration-600">
                <div className="delay-3200">.</div>
                <div className="delay-4400">.</div>
                <div className="delay-5600">.</div>
              </div>
            </div>
            <div className="flex w-fit starting:scale-80 items-baseline starting:opacity-0 transition delay-6800 duration-400 ease-out">
              <div className="bg-white shadow-2xl">
                <div className={cn("bg-clip-text font-bold text-5xl text-transparent", deptAsset.styles)}>
                  {department.name}
                </div>
              </div>
              <div className="ml-2 font-semibold text-2xl">です！</div>
            </div>
          </div>
          <div className="mt-10 starting:scale-0 starting:opacity-0 transition delay-8800 ease-out">
            <Button variant="link" size="lg" className="font-bold text-white" asChild>
              <Link href="/members/dept/list">
                部署一覧を見る
                <ArrowRightIcon />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
