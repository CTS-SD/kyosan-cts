import { client } from "@/db/hono";
import { toast } from "sonner";

export async function deleteQuiz(
  quizId?: string,
  onDeleted?: (quizId: string) => void
) {
  if (!quizId) return;

  if (!window.confirm("問題を削除しますか？")) return;

  const res = await client.api.admin.quiz[":id"].$delete({
    param: {
      id: quizId.toString(),
    },
  });

  if (!res.ok) {
    toast.error("問題の削除に失敗しました");
    return;
  }
  toast.success("問題を削除しました");

  const deletedQuiz = await res.json();

  onDeleted?.(deletedQuiz.id);

  return deletedQuiz.id;
}
