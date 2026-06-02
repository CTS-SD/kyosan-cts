"use client";

import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { insertDepartment } from "@/features/departments/api";
import type { DepartmentValues } from "@/features/departments/editor";
import {
  DepartmentEditor,
  DepartmentEditorCancel,
  DepartmentEditorFields,
  DepartmentEditorSubmit,
} from "./department-editor";

export const AddDepartmentButton = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleAddDepartment = async (values: DepartmentValues) => {
    try {
      await insertDepartment(values);
      toast.success("部署を追加しました");
      setOpen(false);
      router.refresh();
      return true;
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "部署の追加に失敗しました");
      return false;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="rounded-full border border-dashed px-4 py-2 text-muted-foreground hover:bg-accent">
        <div className="flex items-center justify-center gap-2">
          <PlusIcon className="size-4 opacity-60" />
          部署を追加
        </div>
      </DialogTrigger>
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
    </Dialog>
  );
};
