"use client";

import { PlusIcon } from "lucide-react";
import { toast } from "sonner";
import type { Department, Faculty } from "@/lib/db/schema";
import { insertStudents } from "@/lib/student-actions";
import type { StudentValues } from "@/lib/student-editor";
import { Button } from "../../ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { StudentEditor, StudentEditorCancel, StudentEditorFields, StudentEditorSubmit } from "./student-editor";

type Props = {
  faculties: Faculty[];
  departments: Department[];
};

export const AddStudentButton = ({ faculties, departments }: Props) => {
  const handleAddStudent = async (studentData: StudentValues) => {
    const insertResult = await insertStudents([studentData]);
    if (!insertResult.success) {
      toast.error(insertResult.message);
      return false;
    }
    toast.success(insertResult.message);
    return true;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          学生を追加
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="sr-only">学生を追加</DialogTitle>
        <StudentEditor onSubmit={handleAddStudent}>
          <StudentEditorFields faculties={faculties} departments={departments} />
          <DialogFooter>
            <DialogClose asChild>
              <StudentEditorCancel />
            </DialogClose>
            <StudentEditorSubmit>追加</StudentEditorSubmit>
          </DialogFooter>
        </StudentEditor>
      </DialogContent>
    </Dialog>
  );
};
