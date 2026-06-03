"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { insertStudents } from "@/features/students/api";
import type { StudentValues } from "@/features/students/editor";
import type { Department, Faculty } from "@/features/students/types";
import { StudentEditor, StudentEditorCancel, StudentEditorFields, StudentEditorSubmit } from "./student-editor";

type Props = {
  faculties: Faculty[];
  departments: Department[];
  defaultDepartmentId?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
};

export const AddStudentDialogContent = ({ faculties, departments, defaultDepartmentId }: Props) => {
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
    <DialogContent>
      <DialogTitle className="sr-only">学生を追加</DialogTitle>
      <DialogDescription className="sr-only">配属部署発表で表示する学生を追加</DialogDescription>
      <StudentEditor
        defaultValues={defaultDepartmentId ? { departmentId: defaultDepartmentId } : undefined}
        onSubmit={handleAddStudent}
      >
        <StudentEditorFields faculties={faculties} departments={departments} />
        <DialogFooter>
          <DialogClose asChild>
            <StudentEditorCancel />
          </DialogClose>
          <StudentEditorSubmit>追加</StudentEditorSubmit>
        </DialogFooter>
      </StudentEditor>
    </DialogContent>
  );
};
