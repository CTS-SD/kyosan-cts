"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { insertStudents } from "@/lib/student-actions";
import { StudentValues } from "@/lib/student-editor";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { StudentEditor } from "./student-editor";

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
        <DialogHeader>
          <DialogTitle>学生を追加</DialogTitle>
          <DialogDescription>
            配属発表ページに表示する学生を追加します
          </DialogDescription>
        </DialogHeader>
        <StudentEditor
          onSubmit={handleAddStudent}
          footerContent={(formState) => (
            <>
              <DialogClose asChild>
                <Button type="button" variant="secondary" className="ml-auto">
                  キャンセル
                </Button>
              </DialogClose>
              <Button type="submit" disabled={!formState.isDirty}>
                作成
              </Button>
            </>
          )}
        />
      </DialogContent>
    </Dialog>
  );
};
