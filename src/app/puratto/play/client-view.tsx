"use client";

import QuizPlayView from "@/components/quiz-play-view";
import QuizResultsView from "@/components/quiz-results-view";
import { FullQuiz } from "@/lib/quiz-actions";
import { QuizResult } from "@/lib/quiz-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  quizzes: FullQuiz[];
};

const ClientView = ({ quizzes }: Props) => {
  const router = useRouter();
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
      addResult={addResult}
      onNext={handleNext}
      onQuit={handleQuit}
      className="h-[100dvh]"
    />
  );
};

export default ClientView;
