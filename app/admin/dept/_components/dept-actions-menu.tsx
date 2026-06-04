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
import { AddDepartmentDialogContent } from "./add-department-dialog";

type Props = {
  reorderDialog: React.ReactNode;
  facultyDialog: React.ReactNode;
};

export const DeptActionsMenu = ({ reorderDialog, facultyDialog }: Props) => {
  const [addDeptOpen, setAddDeptOpen] = useState(false);
  const [reorderOpen, setReorderOpen] = useState(false);
  const [facultyOpen, setFacultyOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="outline" aria-label="管理メニュー">
            <MenuIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setAddDeptOpen(true)}>
            <PlusIcon />
            部署を追加
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setReorderOpen(true)}>
            <ArrowDownUpIcon />
            部署を並び替え
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setFacultyOpen(true)}>
            <SettingsIcon />
            学部を管理
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={addDeptOpen} onOpenChange={setAddDeptOpen}>
        <AddDepartmentDialogContent onAdded={() => setAddDeptOpen(false)} />
      </Dialog>

      <Dialog open={reorderOpen} onOpenChange={setReorderOpen}>
        {reorderDialog}
      </Dialog>

      <Dialog open={facultyOpen} onOpenChange={setFacultyOpen}>
        {facultyDialog}
      </Dialog>
    </>
  );
};
