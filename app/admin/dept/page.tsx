import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import { AddStudentButton } from "../../../components/admin/dept/add-student-button";
import { DepartmentBoxList } from "../../../components/admin/dept/department-box-list";
import { Button } from "../../../components/ui/button";
import { getDepartments, getFaculties } from "../../../lib/students";

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
      </div>
      <div className="mt-4">
        <DepartmentBoxList />
      </div>
    </div>
  );
};

export default Page;
