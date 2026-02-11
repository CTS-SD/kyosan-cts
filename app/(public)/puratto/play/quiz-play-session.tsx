"use client";

import { XIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { confirm } from "../../../../components/confirm-store";
import { QuizPlay } from "../../../../components/quiz-play/quiz-play";
import { QuizPlayAdminMenu } from "../../../../components/quiz-play/quiz-play-admin-menu";
import { QuizResultsView } from "../../../../components/quiz-play/quiz-results-view";
import { Button } from "../../../../components/ui/button";
import { PlayfulProgress } from "../../../../components/ui/playful-progress";
import type { QuizData, QuizResult } from "../../../../lib/quiz";

type Props = {
  quizzes: QuizData[];
  isAdmin: boolean;
};

export const QuizPlaySession = ({ quizzes, isAdmin }: Props) => {
  const router = useRouter();
  const [quizIndex, setQuizIndex] = useState(0);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [startedAt] = useState(() => Date.now());
  const [finishedAt, setFinishedAt] = useState<number | null>(null);
  const quiz = quizzes[quizIndex];
  const progress = (results.length / quizzes.length) * 100;

  useEffect(() => {
    if (quizIndex >= quizzes.length && finishedAt === null) {
      setFinishedAt(Date.now());
    }
  }, [quizIndex, quizzes.length, finishedAt]);

  const handleAnswer = (result: QuizResult) => {
    setResults((prev) => [...prev, result]);
  };

  const handleNext = () => {
    setQuizIndex((prev) => prev + 1);
  };

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

  if (quizIndex >= quizzes.length) {
    return <QuizResultsView quizzes={quizzes} results={results} playTimeMs={(finishedAt ?? Date.now()) - startedAt} />;
  }

  return (
    <QuizPlay.Root quiz={quiz} onAnswer={handleAnswer} onNext={handleNext} className="relative h-dvh overflow-hidden">
      <QuizPlay.Header>
        <Button size="icon" variant="ghost" onClick={handleQuit}>
          <XIcon />
        </Button>
        <PlayfulProgress value={progress} />
        {isAdmin && <QuizPlayAdminMenu />}
      </QuizPlay.Header>
      <AnimatePresence mode="popLayout">
        <motion.div
          initial={{ translateX: "100%" }}
          animate={{ translateX: "0%" }}
          exit={{ translateX: "-100%" }}
          transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 0.34 }}
          className="flex grow flex-col overflow-auto"
          layout
          key={quizIndex}
        >
          <QuizPlay.Content />
        </motion.div>
      </AnimatePresence>
    </QuizPlay.Root>
  );
};
