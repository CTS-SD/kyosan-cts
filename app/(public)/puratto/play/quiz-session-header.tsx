"use client";

import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { confirm } from "@/components/confirm-store";
import { QuizSessionHeader as QuizSessionHeaderRoot, useQuizSession } from "@/components/quiz-play/quiz-session";
import { Button } from "@/components/ui/button";
import { PlayfulProgress } from "@/components/ui/playful-progress";

export const QuizSessionHeader = () => {
  const { quizzes, results } = useQuizSession();
  const router = useRouter();

  const handleQuit = async () => {
    if (
      results.length === 0 ||
      (await confirm({
        title: "ぷらっとテストを終了しますか？",
        confirmText: "終了する",
        cancelText: "まだ続ける",
      }))
    ) {
      router.push("/puratto");
    }
  };

  const progress = (results.length / quizzes.length) * 100;

  return (
    <QuizSessionHeaderRoot>
      <Button size="icon" variant="ghost" onClick={handleQuit}>
        <XIcon />
      </Button>
      <PlayfulProgress value={progress} />
      {/* {isAdmin && <QuizPlayAdminMenu />} */}
    </QuizSessionHeaderRoot>
  );
};
