"use client";

import { ArrowDownUpIcon, MenuIcon, PlusIcon, SettingsIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Department, Faculty } from "@/features/students/types";
import { AddDepartmentDialogContent } from "./add-department-dialog";
import { DepartmentListDialogContent } from "./department-list";
import { FacultyListDialogContent } from "./faculty-list";

type Props = {
  departments: Department[];
  counts: Record<number, number>;
  faculties: Faculty[];
  facultyCounts: Record<number, number>;
};

export const DeptActionsMenu = ({ departments, counts, faculties, facultyCounts }: Props) => {
  const [addDeptOpen, setAddDeptOpen] = useState(false);
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
          <DropdownMenuItem onClick={() => setAddDeptOpen(true)}>
            <PlusIcon />
            部署を追加
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeptMenuOpen(true)}>
            <ArrowDownUpIcon />
            部署を並び替え
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setFacultyMenuOpen(true)}>
            <SettingsIcon />
            学部を管理
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={addDeptOpen} onOpenChange={setAddDeptOpen}>
        <AddDepartmentDialogContent onAdded={() => setAddDeptOpen(false)} />
      </Dialog>

      <Dialog open={deptMenuOpen} onOpenChange={setDeptMenuOpen}>
        <DepartmentListDialogContent departments={departments} counts={counts} />
      </Dialog>

      <Dialog open={facultyMenuOpen} onOpenChange={setFacultyMenuOpen}>
        <FacultyListDialogContent faculties={faculties} facultyCounts={facultyCounts} />
      </Dialog>
    </>
  );
};
