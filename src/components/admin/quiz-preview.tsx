"use client";

import { QuizPlayView } from "@/components/quiz-play-view";
import { FullQuiz } from "@/lib/quiz-actions";
import { Badge } from "../ui/badge";

type Props = {
  quiz: FullQuiz;
};

export const QuizPreview = ({ quiz }: Props) => {
  return (
    <QuizPlayView
      quiz={quiz}
      progress={20}
      headerContent={<Badge variant="outline">プレビュー</Badge>}
    />
  );
};
