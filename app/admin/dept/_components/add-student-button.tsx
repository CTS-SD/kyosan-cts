"use client";

import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { insertStudents } from "@/features/students/api";
import type { StudentValues } from "@/features/students/editor";
import type { Department, Faculty } from "@/features/students/types";
import { StudentEditor, StudentEditorCancel, StudentEditorFields, StudentEditorSubmit } from "./student-editor";

type Props = {
  faculties: Faculty[];
  departments: Department[];
};

export const AddStudentButton = ({ faculties, departments }: Props) => {
  const router = useRouter();

  const handleAddStudent = async (studentData: StudentValues) => {
    try {
      await insertStudents([studentData]);
      toast.success("学生を追加しました");
      router.refresh();
      return true;
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "学生の追加に失敗しました");
      return false;
    }
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
