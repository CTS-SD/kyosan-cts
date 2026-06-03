"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UserIcon } from "@/components/icons/user-icon";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteStudent, updateStudent } from "@/features/students/api";
import type { Department, Faculty, Student } from "@/features/students/types";
import { StudentEditor, type StudentEditorContextValue } from "./student-editor";

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

  const handleUpdate: StudentEditorContextValue["actions"]["submit"] = async ({ values, form }) => {
    try {
      await updateStudent(student.id, values);
      toast.success("学生を更新しました");
      form.reset(values);
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "学生の更新に失敗しました");
    }
  };

  const handleDelete = async () => {
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
        <DialogDescription className="sr-only">学生を編集します</DialogDescription>
        <StudentEditor.Provider
          defaultValues={student}
          departments={departments}
          faculties={faculties}
          actions={{
            submit: handleUpdate,
            delete: handleDelete,
          }}
        >
          <StudentEditor.Frame>
            <StudentEditor.FieldSet>
              <StudentEditor.Hero>
                <StudentEditor.Avatar />
                <StudentEditor.Field.Name />
              </StudentEditor.Hero>
              <div>
                <StudentEditor.Field.StudentNumber />
                <StudentEditor.Field.Faculty />
                <StudentEditor.Field.Department />
                <StudentEditor.Field.Delete />
              </div>
            </StudentEditor.FieldSet>
            <DialogFooter>
              <DialogClose asChild>
                <StudentEditor.Cancel />
              </DialogClose>
              <StudentEditor.Submit>保存</StudentEditor.Submit>
            </DialogFooter>
          </StudentEditor.Frame>
        </StudentEditor.Provider>
      </DialogContent>
    </Dialog>
  );
};
