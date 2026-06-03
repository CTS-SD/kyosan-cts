"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import type { Department, Faculty } from "@/features/students/types";
import { AddStudentDialogContent } from "./add-student-dialog";

type Props = {
  faculties: Faculty[];
  departments: Department[];
};

export const AddStudentButton = ({ faculties, departments }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          学生を追加
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <AddStudentDialogContent faculties={faculties} departments={departments} />
    </Dialog>
  );
};
