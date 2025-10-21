"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useStudentBundlePromise } from "@/ctx/student-bundle-promise";
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
      <DialogTrigger className="hover:bg-muted flex w-full flex-col items-start rounded-md px-3 py-1.5">
        <div className="font-medium">{student.name}</div>
        <div className="text-foreground/60 flex gap-2 text-sm">
          <div>{student.studentNumber}</div>
          <div>{getFacultyName(student.facultyId)}</div>
        </div>
      </DialogTrigger>
      <DialogPopup>
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
                variant="destructive-outline"
                onClick={handleDeleteStudent}
              >
                <Trash2Icon />
                削除
              </Button>
              <DialogFooter>
                <DialogClose
                  render={
                    <Button type="button" variant="ghost">
                      キャンセル
                    </Button>
                  }
                />
                <Button type="submit" disabled={!formState.isDirty}>
                  保存
                </Button>
              </DialogFooter>
            </>
          )}
        />
      </DialogPopup>
    </Dialog>
  );
};
