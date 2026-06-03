import { ArrowUpRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getDepartments } from "@/server/services/departments";
import { getFaculties } from "@/server/services/faculties";
import { getStudents } from "@/server/services/students";
import { AddStudentButton } from "./_components/add-student-button";
import { DepartmentBoxList } from "./_components/department-box-list";
import { DeptActionsMenu } from "./_components/dept-actions-menu";

export const metadata: Metadata = {
  title: "メンバーを管理 - 配属発表",
};

const Page = async () => {
  const [faculties, departments, students] = await Promise.all([getFaculties(), getDepartments(), getStudents()]);

  const counts = Object.fromEntries(
    departments.map((department) => [
      department.id,
      students.filter((student) => student.departmentId === department.id).length,
    ]),
  );

  const facultyCounts = Object.fromEntries(
    faculties.map((faculty) => [faculty.id, students.filter((student) => student.facultyId === faculty.id).length]),
  );

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="flex gap-2">
        <Button variant="link" className="ml-auto" asChild>
          <Link href="/members/dept/list" target="_blank" rel="noreferrer">
            プレビュー
            <ArrowUpRightIcon />
          </Link>
        </Button>
        <AddStudentButton faculties={faculties} departments={departments} />
        <DeptActionsMenu
          departments={departments}
          counts={counts}
          faculties={faculties}
          facultyCounts={facultyCounts}
        />
      </div>
      <div className="mt-4">
        <DepartmentBoxList />
      </div>
    </div>
  );
};

export default Page;
