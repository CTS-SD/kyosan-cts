"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteQuiz } from "@/lib/quiz/actions";
import { copyToClipboard } from "@/lib/utils";
import { CopyIcon, EllipsisIcon, ShareIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
          <EllipsisIcon aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleCopyUrl}>
          <CopyIcon aria-hidden />
          リンクをコピー
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleShare}>
          <ShareIcon aria-hidden />
          共有
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete}>
          <Trash2Icon aria-hidden />
          削除
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
