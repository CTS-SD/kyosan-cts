import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getDepartments } from "@/server/services/departments";
import { getDepartmentCounts } from "@/server/services/students";
import { DepartmentList } from "./department-list";

export const DepartmentListDialogContent = async () => {
  const [departments, studentCounts] = await Promise.all([getDepartments(), getDepartmentCounts()]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>部署を並び替え</DialogTitle>
        <DialogDescription>配属発表ページの並び順に影響します</DialogDescription>
      </DialogHeader>
      <div className="p-2 pt-0">
        <DepartmentList departments={departments} studentCounts={studentCounts} />
      </div>
    </DialogContent>
  );
};
