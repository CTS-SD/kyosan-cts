"use client";

import { AddStudentButton } from "@/components/admin/dept/add-student-button";
import { DepartmentBoxList } from "@/components/admin/dept/department-box-list";
import { VisibilitySetting } from "@/components/admin/dept/visibility-setting";
import { YearSetting } from "@/components/admin/dept/year-setting";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

const ClientView = () => {
  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="flex gap-2">
        <Button variant="link" asChild className="ml-auto">
          <Link href="/members/dept/list" target="_blank" rel="noreferrer">
            プレビュー
            <ArrowUpRightIcon />
          </Link>
        </Button>
        <AddStudentButton />
      </div>
      <div className="mt-4">
        <DepartmentBoxList />
      </div>
      <div className="mt-6 space-y-4">
        <YearSetting />
        <VisibilitySetting />
      </div>
    </div>
  );
};

export default ClientView;
