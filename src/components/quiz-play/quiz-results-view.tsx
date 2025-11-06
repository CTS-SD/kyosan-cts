import { QuizResult } from "@/lib/quiz-form";
import { QuizData } from "@/lib/quiz/data";
import { motion, stagger } from "motion/react";
import Link from "next/link";
import { PlayfulButton } from "../ui/playful-button";
import { QuizResultItem } from "./quiz-result-item";

type Props = {
  quizzes: QuizData[];
  results: QuizResult[];
};

export const QuizResultsView = ({ quizzes, results }: Props) => {
  const correctCount = results.filter((r) => r.isCorrect).length;

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="flex justify-center py-16">
        <motion.div
          className="text-3xl font-bold"
          initial={{ scale: 0.5, opacity: 0, translateY: 80, rotate: -8 }}
          animate={{ scale: 1, opacity: 1, translateY: 0, rotate: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 12 }}
        >
          {correctCount}問正解
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
            key={i}
            variants={{
              hidden: { opacity: 0, y: 10, scale: 0.9 },
              show: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ type: "spring", stiffness: 300, damping: 12 }}
          >
            <QuizResultItem
              index={i + 1}
              result={result}
              quiz={quizzes.find((q) => q.id === result.quizId)!}
            />
          </motion.div>
        ))}
      </motion.div>
      <div className="bg-background sticky bottom-0 mt-6 py-4">
        <PlayfulButton
          render={<Link href="/puratto">OK</Link>}
          className="w-full"
        />
      </div>
    </div>
  );
};
