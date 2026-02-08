"use client";

import { CopyIcon, EllipsisIcon, ShareIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteQuiz } from "@/lib/quiz";
import { copyToClipboard } from "@/lib/utils";

type Props = {
  quizId: number;
};

export const QuizViewMenu = ({ quizId }: Props) => {
  const router = useRouter();

  const handleShare = async () => {
    if ("share" in navigator) {
      await navigator
        .share({
          title: `ぷらっとテスト 問題No.${quizId}`,
          url: window.location.href,
        })
        .catch(() => {});
    }
  };

  const handleCopyUrl = async () => {
    if (await copyToClipboard(window.location.href)) {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="問題メニュー">
          <EllipsisIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
