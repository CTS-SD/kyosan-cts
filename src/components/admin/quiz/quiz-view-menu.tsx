"use client";

import { Button } from "@/components/ui/button";
import {
  Menu,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
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
    <Menu>
      <MenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="問題メニュー">
          <EllipsisIcon />
        </Button>
      </MenuTrigger>
      <MenuPopup align="end">
        <MenuItem onClick={handleCopyUrl}>
          <CopyIcon />
          リンクをコピー
        </MenuItem>
        <MenuItem onClick={handleShare}>
          <ShareIcon />
          共有
        </MenuItem>
        <MenuSeparator />
        <MenuItem onClick={handleDelete} variant="destructive">
          <Trash2Icon />
          削除
        </MenuItem>
      </MenuPopup>
    </Menu>
  );
};
