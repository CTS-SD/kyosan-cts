"use client";

import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useStudentBundlePromise } from "@/ctx/student-bundle-promise";
import type { Student } from "@/lib/db/schema";
import { deleteStudent, updateStudent } from "@/lib/student-actions";
import type { StudentValues } from "@/lib/student-editor";
import { StudentEditor, StudentEditorCancel, StudentEditorForm, StudentEditorSubmit } from "./student-editor";

type Props = {
  student: Student;
};

export const StudentItem = ({ student }: Props) => {
  const { faculties } = use(useStudentBundlePromise());
  const router = useRouter();

  const getFacultyName = (facultyId: number) => {
    const faculty = faculties.find((f) => f.id === facultyId);
    return faculty?.name;
  };

  const handleUpdateStudent = async (values: StudentValues) => {
    const updateResult = await updateStudent(student.id, values);
    if (!updateResult.success) {
      toast.error(updateResult.message);
      return;
    }
    toast.success(updateResult.message);
    router.refresh();
    return;
  };

  const handleDeleteStudent = async () => {
    if (!window.confirm("この学生を削除してよろしいですか？")) return;
    const deleteResult = await deleteStudent(student.id);
    if (!deleteResult.success) {
      toast.error(deleteResult.message);
      return;
    }
    toast.success(deleteResult.message);
    router.refresh();
    return;
  };

  return (
    <Dialog>
      <DialogTrigger className="flex w-full flex-col items-start rounded-md px-3 py-1.5 hover:bg-muted">
        <div className="text-start font-medium">{student.name}</div>
        <div className="flex gap-2 text-foreground/60 text-sm">
          <div>{student.studentNumber}</div>
          <div>{getFacultyName(student.facultyId)}</div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>学生を編集</DialogTitle>
        </DialogHeader>
        <StudentEditor defaultValues={student} onSubmit={handleUpdateStudent}>
          <StudentEditorForm />
          <DialogFooter>
            <Button type="button" variant="destructive" className="sm:mr-auto" onClick={handleDeleteStudent}>
              <Trash2Icon />
              削除
            </Button>
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
