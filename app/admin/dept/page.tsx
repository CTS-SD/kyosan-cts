import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { AddStudentButton } from "../../../components/admin/dept/add-student-button";
import { DepartmentBoxList } from "../../../components/admin/dept/department-box-list";
import { DepartmentBoxListFallback } from "../../../components/admin/dept/department-box-list-fallback";
import { Button } from "../../../components/ui/button";
import { StudentBundlePromiseProvider } from "../../../hooks/use-student-bundle-promise";
import { getStudentBundle } from "../../../lib/students";

const Page = () => {
  const studentBundlePromise = getStudentBundle();

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="flex gap-2">
        <Button variant="link" className="ml-auto" asChild>
          <Link href="/members/dept/list" target="_blank" rel="noreferrer">
            プレビュー
            <ArrowUpRightIcon />
          </Link>
        </Button>
        <StudentBundlePromiseProvider value={studentBundlePromise}>
          <AddStudentButton />
        </StudentBundlePromiseProvider>
      </div>
      <div className="mt-4">
        <Suspense fallback={<DepartmentBoxListFallback />}>
          <StudentBundlePromiseProvider value={studentBundlePromise}>
            <DepartmentBoxList />
          </StudentBundlePromiseProvider>
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
