"use client";

import { EllipsisIcon, PencilIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteDepartment, updateDepartment } from "@/features/departments/api";
import type { DepartmentValues } from "@/features/departments/editor";
import type { Department, Faculty } from "@/features/students/types";
import { AddStudentDialogContent } from "./add-student-dialog";
import {
  DepartmentEditor,
  DepartmentEditorCancel,
  DepartmentEditorFields,
  DepartmentEditorSubmit,
} from "./department-editor";

type Props = {
  department: Department;
  studentCount: number;
  faculties: Faculty[];
  departments: Department[];
};

export const DepartmentActions = ({ department, studentCount, faculties, departments }: Props) => {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [addStudentOpen, setAddStudentOpen] = useState(false);

  const handleUpdate = async (values: DepartmentValues) => {
    try {
      await updateDepartment(department.id, values);
      toast.success("部署を更新しました");
      setEditOpen(false);
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "部署の更新に失敗しました");
    }
    return false;
  };

  const handleDelete = async () => {
    try {
      await deleteDepartment(department.id);
      toast.success("部署を削除しました");
      setDeleteOpen(false);
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "部署の削除に失敗しました");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon-sm"
            variant="ghost"
            className="ml-auto shrink-0 text-muted-foreground"
            aria-label="部署メニュー"
          >
            <EllipsisIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setEditOpen(true)}>
            <PencilIcon />
            部署を編集
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setAddStudentOpen(true)}>
            <PlusIcon />
            学生を追加
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onSelect={() => setDeleteOpen(true)}>
            <Trash2Icon />
            削除する
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogTitle className="sr-only">部署を編集</DialogTitle>
          <DialogDescription className="sr-only">配属部署発表で表示する部署を編集</DialogDescription>
          <DepartmentEditor defaultValues={department} onSubmit={handleUpdate}>
            <DepartmentEditorFields />
            <DialogFooter>
              <DialogClose asChild>
                <DepartmentEditorCancel />
              </DialogClose>
              <DepartmentEditorSubmit>変更を保存</DepartmentEditorSubmit>
            </DialogFooter>
          </DepartmentEditor>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>部署を削除しますか？</AlertDialogTitle>
          <AlertDialogDescription>
            部署「{department.name}」を削除します。
            {studentCount > 0 && <>所属する学生{studentCount}名も全て削除されます。</>}
            この操作は元に戻せません。
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={handleDelete}>
              削除する
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={addStudentOpen} onOpenChange={setAddStudentOpen}>
        <AddStudentDialogContent
          defaultValues={{ departmentId: department.id }}
          faculties={faculties}
          departments={departments}
        />
      </Dialog>
    </>
  );
};
