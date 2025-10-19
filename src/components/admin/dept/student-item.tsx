"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useStudentBundlePromise } from "@/ctx/student-bundle-promise-context";
import { Student } from "@/lib/db/schema";
import * as studentActions from "@/lib/student-actions";
import { StudentValues } from "@/lib/student-editor";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { toast } from "sonner";
import { StudentEditor } from "./student-editor";

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
    const updateResult = await studentActions.updateStudent(student.id, values);
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
    const deleteResult = await studentActions.deleteStudent(student.id);
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
      <DialogTrigger asChild>
        <button className="hover:bg-muted flex w-full flex-col items-start rounded-md px-3 py-1.5">
          <div className="font-medium">{student.name}</div>
          <div className="text-foreground/60 flex gap-2 text-sm">
            <div>{student.studentNumber}</div>
            <div>{getFacultyName(student.facultyId)}</div>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>学生を編集</DialogTitle>
        </DialogHeader>
        <StudentEditor
          defaultValues={student}
          onSubmit={handleUpdateStudent}
          footerContent={(formState) => (
            <>
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={handleDeleteStudent}
                aria-label="学生を削除"
              >
                <Trash2Icon />
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary" className="ml-auto">
                  キャンセル
                </Button>
              </DialogClose>
              <Button type="submit" disabled={!formState.isDirty}>
                保存
              </Button>
            </>
          )}
        />
      </DialogContent>
    </Dialog>
  );
};
