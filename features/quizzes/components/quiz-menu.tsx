"use client";

import { CopyIcon, ShareIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { copyToClipboard } from "@/lib/utils";
import { useDeleteQuiz } from "../hooks/use-quiz-mutations";

export const QuizMenuItems = ({ quizId }: { quizId: number }) => {
  const router = useRouter();
  const { mutateAsync: deleteQuiz } = useDeleteQuiz();

  const url = `${window.location.origin}/admin/puratto/q/${quizId}`;

  const handleShare = async () => {
    if ("share" in navigator) {
      await navigator
        .share({
          title: `ぷらっとテスト No.${quizId}`,
          url,
        })
        .catch(() => {});
    }
  };

  const handleCopyUrl = async () => {
    if (await copyToClipboard(url)) {
      toast.success("リンクをコピーしました");
    } else {
      toast.error("リンクのコピーに失敗しました");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("この問題を削除してよろしいですか？")) return;
    try {
      await deleteQuiz(quizId);
      toast.success("問題を削除しました");
      router.push("/admin/puratto");
    } catch {
      toast.error("問題の削除に失敗しました");
    }
  };

  return (
    <>
      <DropdownMenuItem onClick={handleCopyUrl}>
        <CopyIcon />
        リンクをコピー
      </DropdownMenuItem>
      <DropdownMenuItem onClick={handleShare}>
        <ShareIcon />
        共有
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={handleDelete} variant="destructive">
        <Trash2Icon />
        削除
      </DropdownMenuItem>
    </>
  );
};
