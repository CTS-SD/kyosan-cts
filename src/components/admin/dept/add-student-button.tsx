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
import { useDeptStore } from "@/providers/dept-store-provider";
import { UserPlus2Icon } from "lucide-react";
import { toast } from "sonner";
import { StudentEditor } from "./student-editor";

export const AddStudentButton = () => {
  const { addStudents } = useDeptStore((store) => store);

  const handleAddStudent = async (studentData: StudentValues) => {
    const insertResult = await insertStudents([studentData]);
    if (!insertResult.success) {
      toast.error(insertResult.message);
      return;
    }
    addStudents(insertResult.data);
    toast.success(insertResult.message);
    return true;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          学生を追加
          <UserPlus2Icon />
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
          footerContent={({ isDirty }) => (
            <>
              <DialogClose asChild>
                <Button type="button" variant="secondary" className="ml-auto">
                  キャンセル
                </Button>
              </DialogClose>
              <Button type="submit" disabled={!isDirty}>
                作成
              </Button>
            </>
          )}
        />
      </DialogContent>
    </Dialog>
  );
};
