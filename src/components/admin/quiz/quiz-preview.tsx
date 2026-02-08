import { QuizPlayView } from "@/components/quiz-play/quiz-play-view";
import { Badge } from "@/components/ui/badge";
import type { QuizData } from "@/lib/quiz";

type Props = Omit<React.ComponentProps<typeof QuizPlayView>, "quiz" | "progress"> & {
  quiz: QuizData | null;
};

export const QuizPreview = ({ quiz, ...props }: Props) => {
  if (!quiz) return null;
  return (
    <QuizPlayView
      quiz={quiz}
      headerStartContent={<Badge variant="outline">プレビュー</Badge>}
      progress={20}
      {...props}
    />
  );
};
