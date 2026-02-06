"use client";

import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { insertStudents } from "@/lib/student-actions";
import type { StudentValues } from "@/lib/student-editor";
import { StudentEditor, StudentEditorCancel, StudentEditorForm, StudentEditorSubmit } from "./student-editor";

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
        <DialogHeader>
          <DialogTitle>学生を追加</DialogTitle>
          <DialogDescription>配属発表ページに表示する学生を追加します</DialogDescription>
        </DialogHeader>
        <StudentEditor onSubmit={handleAddStudent}>
          <StudentEditorForm />
          <DialogFooter>
            <DialogClose asChild>
              <StudentEditorCancel />
            </DialogClose>
            <StudentEditorSubmit />
          </DialogFooter>
        </StudentEditor>
      </DialogContent>
    </Dialog>
  );
};
