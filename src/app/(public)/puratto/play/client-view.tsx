"use client";

import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { QuizPlayAdminMenu } from "@/components/quiz-play/quiz-play-admin-menu";
import { QuizPlayView } from "@/components/quiz-play/quiz-play-view";
import { QuizResultsView } from "@/components/quiz-play/quiz-results-view";
import { Button } from "@/components/ui/button";
import { useSessionPromise } from "@/ctx/session-promise";
import type { QuizData } from "@/lib/quiz/data";
import type { QuizResult } from "@/lib/quiz-form";

type Props = {
  quizzes: QuizData[];
};

export const ClientView = ({ quizzes }: Props) => {
  const router = useRouter();
  const session = use(useSessionPromise());
  const [quizIndex, setQuizIndex] = useState(0);
  const [results, setResults] = useState<QuizResult[]>([]);
  const quiz = quizzes[quizIndex];

  const addResult = (result: QuizResult) => {
    setResults((prev) => [...prev, result]);
  };

  const handleNext = () => {
    setQuizIndex((prev) => prev + 1);
  };

  const handleQuit = () => {
    if (!window.confirm("ぷらっとテストを中断しますか？")) return;
    router.push("/puratto");
  };

  if (quizIndex >= quizzes.length) {
    return <QuizResultsView quizzes={quizzes} results={results} />;
  }

  return (
    <QuizPlayView
      quiz={quiz}
      progress={(results.length / quizzes.length) * 100}
      headerStartContent={
        <Button size="icon" onClick={handleQuit} variant="ghost">
          <XIcon />
        </Button>
      }
      headerEndContent={session?.user.role === "admin" ? <QuizPlayAdminMenu quizId={quiz.id} /> : null}
      addResult={addResult}
      onNext={handleNext}
      className="h-dvh"
    />
  );
};
