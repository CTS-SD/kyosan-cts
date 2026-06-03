"use client";

import { ArrowDownUpIcon, GraduationCapIcon, MenuIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Department, Faculty } from "@/features/students/types";
import { DepartmentListDialogContent } from "./department-list";
import { FacultyListDialogContent } from "./faculty-list";

type Props = {
  departments: Department[];
  counts: Record<number, number>;
  faculties: Faculty[];
  facultyCounts: Record<number, number>;
};

export const DeptActionsMenu = ({ departments, counts, faculties, facultyCounts }: Props) => {
  const [deptMenuOpen, setDeptMenuOpen] = useState(false);
  const [facultyMenuOpen, setFacultyMenuOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="outline">
            <MenuIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setDeptMenuOpen(true)}>
            <ArrowDownUpIcon />
            部署を並び替え
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFacultyMenuOpen(true)}>
            <GraduationCapIcon />
            学部を管理
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={deptMenuOpen} onOpenChange={setDeptMenuOpen}>
        <DepartmentListDialogContent departments={departments} counts={counts} />
      </Dialog>

      <Dialog open={facultyMenuOpen} onOpenChange={setFacultyMenuOpen}>
        <FacultyListDialogContent faculties={faculties} facultyCounts={facultyCounts} />
      </Dialog>
    </>
  );
};
