"use client";

import { useMemo } from "react";
import { useConfirmStore } from "./confirm-store";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

export function ConfirmDialogHost() {
  const queue = useConfirmStore((s) => s.queue);
  const resolveActive = useConfirmStore((s) => s.resolveActive);

  const active = queue[0] ?? null;

  const open = !!active;

  const title = active?.options.title ?? "";
  const description = active?.options.description;
  const cancelText = active?.options.cancelText ?? "キャンセル";
  const confirmText = active?.options.confirmText ?? "確認";
  const confirmVariant = active?.options.confirmVariant ?? "destructive";

  const contentKey = useMemo(() => active?.id ?? "empty", [active?.id]);

  return (
    <AlertDialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) resolveActive(false);
      }}
    >
      <AlertDialogContent key={contentKey} className="">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description ? <AlertDialogDescription>{description}</AlertDialogDescription> : null}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="" onClick={() => resolveActive(false)}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction className="" variant={confirmVariant} onClick={() => resolveActive(true)}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
