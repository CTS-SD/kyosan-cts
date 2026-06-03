import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getFaculties } from "@/server/services/faculties";
import { getFacultyCounts } from "@/server/services/students";
import { FacultyList } from "./faculty-list";

export const FacultyListDialogContent = async () => {
  const [faculties, counts] = await Promise.all([getFaculties(), getFacultyCounts()]);

  return (
    <DialogContent className="bg-accent">
      <DialogHeader>
        <DialogTitle>学部を管理</DialogTitle>
        <DialogDescription className="sr-only">学部の追加・編集・削除ができます。</DialogDescription>
      </DialogHeader>
      <div className="px-4 pb-4">
        <FacultyList faculties={faculties} counts={counts} />
      </div>
    </DialogContent>
  );
};
