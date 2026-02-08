import { motion, stagger } from "motion/react";
import Link from "next/link";
import type { QuizData, QuizResult } from "@/lib/quiz";
import { PlayfulButton } from "../ui/playful-button";
import { QuizResultItem } from "./quiz-result-item";

type Props = {
  quizzes: QuizData[];
  results: QuizResult[];
  playTimeMs: number;
};

const formatPlayTime = (playTimeMs: number) => {
  const totalSeconds = Math.max(0, Math.floor(playTimeMs / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}分${seconds.toString().padStart(2, "0")}秒`;
};

export const QuizResultsView = ({ quizzes, results, playTimeMs }: Props) => {
  const totalCount = quizzes.length;
  const correctCount = results.filter((r) => r.isCorrect).length;
  const correctRate = totalCount > 0 ? (correctCount / totalCount) * 100 : 0;
  const roundedCorrectRate = Number(correctRate.toFixed(1));

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="py-10">
        <motion.div
          className="space-y-5 rounded-2xl border bg-card p-6 shadow-[0_4px] shadow-border"
          initial={{ scale: 0.9, opacity: 0, translateY: 32 }}
          animate={{ scale: 1, opacity: 1, translateY: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 16 }}
        >
          <div className="text-center font-black text-4xl tracking-tight">
            {correctCount}
            <span className="ml-1 font-bold text-2xl text-muted-foreground">/ {totalCount} 問正解</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border bg-background px-4 py-3">
              <div className="text-muted-foreground text-sm">正答率</div>
              <div className="font-bold text-2xl">{roundedCorrectRate}%</div>
            </div>
            <div className="rounded-xl border bg-background px-4 py-3">
              <div className="text-muted-foreground text-sm">プレイ時間</div>
              <div className="font-bold text-2xl">{formatPlayTime(playTimeMs)}</div>
            </div>
          </div>
        </motion.div>
      </div>
      <motion.div
        className="space-y-6"
        variants={{
          show: {
            transition: {
              delayChildren: stagger(0.1),
            },
          },
        }}
        initial="hidden"
        animate="show"
      >
        {results.map((result, i) => (
          <motion.div
            key={result.quizId}
            variants={{
              hidden: { opacity: 0, y: 10, scale: 0.9 },
              show: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ type: "spring", stiffness: 300, damping: 12 }}
          >
            <QuizResultItem index={i + 1} result={result} quiz={quizzes.find((q) => q.id === result.quizId)!} />
          </motion.div>
        ))}
      </motion.div>
      <div className="sticky bottom-0 mt-6 bg-background py-4">
        <PlayfulButton asChild>
          <Link href="/puratto">OK</Link>
        </PlayfulButton>
      </div>
    </div>
  );
};
