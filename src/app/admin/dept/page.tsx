import { AddStudentButton } from "@/components/admin/dept/add-student-button";
import { DepartmentBoxList } from "@/components/admin/dept/department-box-list";
import { DepartmentBoxListFallback } from "@/components/admin/dept/department-box-list-fallback";
import { VisibilitySetting } from "@/components/admin/dept/visibility-setting";
import { YearSetting } from "@/components/admin/dept/year-setting";
import { Button } from "@/components/ui/button";
import { getConfig } from "@/lib/config/actions";
import { getStudentBundle } from "@/lib/students";
import { StudentBundlePromiseProvider } from "@/providers/student-bundle-promise-provider";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const Page = () => {
  const configPromise = getConfig();
  const studentBundlePromise = getStudentBundle();

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="flex gap-2">
        <Button variant="link" asChild className="ml-auto">
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
        <StudentBundlePromiseProvider value={studentBundlePromise}>
          <Suspense fallback={<DepartmentBoxListFallback />}>
            <DepartmentBoxList />
          </Suspense>
        </StudentBundlePromiseProvider>
      </div>
      <div className="mt-6 space-y-4">
        <YearSetting configPromise={configPromise} />
        <VisibilitySetting configPromise={configPromise} />
      </div>
    </div>
  );
};

export default Page;
