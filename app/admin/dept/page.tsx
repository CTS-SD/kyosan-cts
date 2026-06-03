import { ArrowUpRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getDepartments } from "@/server/services/departments";
import { getFaculties } from "@/server/services/faculties";
import { AddStudentButton } from "./_components/add-student-button";
import { DepartmentBoxList } from "./_components/department-box-list";
import { DepartmentListDialogContent } from "./_components/department-list-dialog";
import { DeptActionsMenu } from "./_components/dept-actions-menu";
import { FacultyListDialogContent } from "./_components/faculty-list-dialog";

export const metadata: Metadata = {
  title: "メンバーを管理 - 配属発表",
};

const Page = async () => {
  const [faculties, departments] = await Promise.all([getFaculties(), getDepartments()]);

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
        <DeptActionsMenu reorderDialog={<DepartmentListDialogContent />} facultyDialog={<FacultyListDialogContent />} />
      </div>
      <div className="mt-4">
        <DepartmentBoxList />
      </div>
    </div>
  );
};

export default Page;
