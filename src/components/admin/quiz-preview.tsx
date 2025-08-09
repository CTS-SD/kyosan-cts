"use client";

import QuizPlayView from "@/components/quiz-play-view";
import { FullQuiz } from "@/lib/quiz-actions";
import { QuizResult } from "@/lib/quiz-form";
import { Badge } from "../ui/badge";

type Props = {
  quiz: FullQuiz;
};

const QuizPreview = ({ quiz }: Props) => {
  const addResult = (result: QuizResult) => {};

  const handleNext = () => {};

  return (
    <QuizPlayView
      quiz={quiz}
      progress={20}
      addResult={addResult}
      onNext={handleNext}
      headerContent={<Badge variant="outline">プレビュー</Badge>}
    />
  );
};

export default QuizPreview;
