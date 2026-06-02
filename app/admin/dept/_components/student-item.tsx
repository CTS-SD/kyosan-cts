"use client";

import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components//ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "@/components//ui/dialog";
import { UserIcon } from "@/components/icons/user-icon";
import { deleteStudent, updateStudent } from "@/features/students/api";
import type { StudentValues } from "@/features/students/editor";
import type { Department, Faculty, Student } from "@/features/students/types";
import { StudentEditor, StudentEditorCancel, StudentEditorFields, StudentEditorSubmit } from "./student-editor";

type Props = {
  student: Student;
  faculties: Faculty[];
  departments: Department[];
};

export const StudentItem = ({ student, faculties, departments }: Props) => {
  const router = useRouter();

  const getFacultyName = (facultyId: number) => {
    const faculty = faculties.find((f) => f.id === facultyId);
    return faculty?.name;
  };

  const handleUpdateStudent = async (values: StudentValues) => {
    try {
      await updateStudent(student.id, values);
      toast.success("学生を更新しました");
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "学生の更新に失敗しました");
    }
    return false; // false means; Do not reset the form
  };

  const handleDeleteStudent = async () => {
    if (!window.confirm("この学生を削除してよろしいですか？")) return;
    try {
      await deleteStudent(student.id);
      toast.success("学生を削除しました");
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "学生の削除に失敗しました");
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="flex w-full items-center gap-3 rounded-xl px-3 py-2 hover:bg-accent">
        <div className="grid size-10 shrink-0 place-content-center overflow-clip rounded-full bg-accent">
          <UserIcon className="size-10" />
        </div>
        <div className="min-w-0">
          <div className="text-start font-medium">{student.name}</div>
          <div className="flex min-w-0 gap-2 text-foreground/60 text-sm">
            <div>{student.studentNumber}</div>
            <div className="truncate">{getFacultyName(student.facultyId)}</div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="sr-only">学生を編集</DialogTitle>
        <StudentEditor defaultValues={student} onSubmit={handleUpdateStudent}>
          <StudentEditorFields faculties={faculties} departments={departments} />
          <DialogFooter>
            <div className="flex grow items-center justify-between gap-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 sm:mr-auto sm:flex-initial"
                onClick={handleDeleteStudent}
              >
                <Trash2Icon />
                削除
              </Button>
              <DialogClose asChild className="flex-1 sm:flex-initial">
                <StudentEditorCancel />
              </DialogClose>
            </div>
            <StudentEditorSubmit>変更を保存</StudentEditorSubmit>
          </DialogFooter>
        </StudentEditor>
      </DialogContent>
    </Dialog>
  );
};
