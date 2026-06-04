"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { insertDepartment } from "@/features/departments/api";
import type { DepartmentValues } from "@/features/departments/editor";
import {
  DepartmentEditor,
  DepartmentEditorCancel,
  DepartmentEditorFields,
  DepartmentEditorSubmit,
} from "./department-editor";

export const AddDepartmentDialogContent = ({ onAdded }: { onAdded?: () => void }) => {
  const router = useRouter();

  const handleAddDepartment = async (values: DepartmentValues) => {
    try {
      await insertDepartment(values);
      toast.success("部署を追加しました");
      router.refresh();
      onAdded?.();
      return true;
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "部署の追加に失敗しました");
      return false;
    }
  };

  return (
    <DialogContent>
      <DialogTitle className="sr-only">部署を追加</DialogTitle>
      <DialogDescription className="sr-only">配属部署発表で表示する部署を追加</DialogDescription>
      <DepartmentEditor onSubmit={handleAddDepartment}>
        <DepartmentEditorFields />
        <DialogFooter>
          <DialogClose asChild>
            <DepartmentEditorCancel />
          </DialogClose>
          <DepartmentEditorSubmit>追加</DepartmentEditorSubmit>
        </DialogFooter>
      </DepartmentEditor>
    </DialogContent>
  );
};
