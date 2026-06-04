"use client";

import { CheckIcon, PencilIcon, PlusIcon, Trash2Icon, XIcon } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { List, ListItem } from "@/components/ui/list";
import { Spinner } from "@/components/ui/spinner";
import { deleteFaculty, insertFaculty, updateFaculty } from "@/features/faculties/api";
import { FacultyEditorSchema, type FacultyValues } from "@/features/faculties/editor";
import type { Faculty, StudentCountById } from "@/features/students/types";

type Props = {
  faculties: Faculty[];
  studentCounts: StudentCountById;
};

export const FacultyList = ({ faculties, studentCounts }: Props) => {
  const router = useRouter();
  const [adding, setAdding] = useState(false);

  const sorted = [...faculties].sort((a, b) => a.name.localeCompare(b.name, "ja"));

  const handleAdd = async (values: FacultyValues) => {
    try {
      await insertFaculty(values);
      toast.success("学部を追加しました");
      router.refresh();
      return true;
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "学部の追加に失敗しました");
      return false;
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {adding ? (
        <FacultyNameForm submitLabel="追加" onSubmit={handleAdd} onCancel={() => setAdding(false)} />
      ) : (
        <Button type="button" variant="outline" onClick={() => setAdding(true)}>
          <PlusIcon className="size-4 opacity-60" />
          学部を追加
        </Button>
      )}
      <List>
        {sorted.map((faculty) => (
          <FacultyItem key={faculty.id} faculty={faculty} count={studentCounts[faculty.id] ?? 0} />
        ))}
        {sorted.length === 0 && !adding && (
          <ListItem>
            <ItemContent>
              <ItemDescription>学部が登録されていません。</ItemDescription>
            </ItemContent>
          </ListItem>
        )}
      </List>
    </div>
  );
};

const FacultyItem = ({ faculty, count }: { faculty: Faculty; count: number }) => {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleUpdate = async (values: FacultyValues) => {
    try {
      await updateFaculty(faculty.id, values);
      toast.success("学部を更新しました");
      router.refresh();
      return true;
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "学部の更新に失敗しました");
      return false;
    }
  };

  const handleDelete = async () => {
    try {
      await deleteFaculty(faculty.id);
      toast.success("学部を削除しました");
      setDeleteOpen(false);
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "学部の削除に失敗しました");
    }
  };

  if (editing) {
    return (
      <ListItem>
        <FacultyNameForm
          defaultName={faculty.name}
          submitLabel="保存"
          onSubmit={handleUpdate}
          onCancel={() => setEditing(false)}
        />
      </ListItem>
    );
  }

  return (
    <ListItem>
      <ItemContent>
        <ItemTitle>{faculty.name}</ItemTitle>
        <ItemDescription>{count}名</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button
          size="icon-sm"
          variant="ghost"
          className="text-muted-foreground"
          aria-label={`${faculty.name} を編集`}
          onClick={() => setEditing(true)}
        >
          <PencilIcon />
        </Button>
        <Button
          size="icon-sm"
          variant="ghost"
          className="text-muted-foreground"
          aria-label={`${faculty.name} を削除`}
          onClick={() => setDeleteOpen(true)}
        >
          <Trash2Icon />
        </Button>
      </ItemActions>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>学部を削除しますか？</AlertDialogTitle>
          <AlertDialogDescription>
            学部「{faculty.name}」を削除します。
            {count > 0 && <>所属する学生{count}名も全て削除されます。</>}
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
    </ListItem>
  );
};

const FacultyNameForm = ({
  defaultName = "",
  submitLabel,
  onSubmit,
  onCancel,
}: {
  defaultName?: string;
  submitLabel: string;
  onSubmit: (values: FacultyValues) => Promise<boolean>;
  onCancel: () => void;
}) => {
  const [name, setName] = useState(defaultName);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsed = FacultyEditorSchema.safeParse({ name });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "入力内容を確認してください。");
      return;
    }
    setSaving(true);
    const shouldClose = await onSubmit(parsed.data);
    setSaving(false);
    if (shouldClose) onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="〇〇学部"
        autoFocus
        disabled={saving}
        className="bg-card"
      />
      <Button type="submit" size="icon-sm" disabled={saving} aria-label={submitLabel}>
        {saving ? <Spinner /> : <CheckIcon />}
      </Button>
      <Button type="button" size="icon-sm" variant="ghost" disabled={saving} aria-label="キャンセル" onClick={onCancel}>
        <XIcon />
      </Button>
    </form>
  );
};
