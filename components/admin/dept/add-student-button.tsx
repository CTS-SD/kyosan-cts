"use client";

import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { insertStudents } from "../../../lib/student-actions";
import type { StudentValues } from "../../../lib/student-editor";
import { Button } from "../../ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { StudentEditor, StudentEditorCancel, StudentEditorFields, StudentEditorSubmit } from "./student-editor";

export const AddStudentButton = () => {
  const router = useRouter();

  const handleAddStudent = async (studentData: StudentValues) => {
    const insertResult = await insertStudents([studentData]);
    if (!insertResult.success) {
      toast.error(insertResult.message);
      return;
    }
    toast.success(insertResult.message);
    router.refresh();
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
          <StudentEditorFields />
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
