"use client";

import { QuizPlayView } from "@/components/quiz-play-view";
import { Badge } from "@/components/ui/badge";
import { QuizData } from "@/lib/quiz/data";

type Props = {
  quiz: QuizData | null;
};

export const QuizPreview = ({ quiz }: Props) => {
  if (!quiz) return null;
  return (
    <QuizPlayView
      quiz={quiz}
      progress={20}
      headerContent={<Badge variant="outline">プレビュー</Badge>}
    />
  );
};
