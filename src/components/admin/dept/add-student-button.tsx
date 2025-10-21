"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
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
      <DialogTrigger
        render={
          <Button>
            学生を追加
            <PlusIcon />
          </Button>
        }
      />
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>学生を追加</DialogTitle>
          <DialogDescription>
            配属発表ページに表示する学生を追加します
          </DialogDescription>
        </DialogHeader>
        <StudentEditor
          onSubmit={handleAddStudent}
          footerContent={(formState) => (
            <DialogFooter>
              <DialogClose
                render={
                  <Button type="button" variant="secondary">
                    キャンセル
                  </Button>
                }
              />
              <Button type="submit" disabled={!formState.isDirty}>
                作成
              </Button>
            </DialogFooter>
          )}
        />
      </DialogPopup>
    </Dialog>
  );
};
