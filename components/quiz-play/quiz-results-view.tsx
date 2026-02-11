import { Clock3Icon, LightbulbIcon, ZapIcon } from "lucide-react";
import { motion, stagger } from "motion/react";
import Link from "next/link";
import type { QuizData, QuizResult } from "../../lib/quiz";
import { PlayfulButton } from "../ui/playful-button";
import { UserAvatar } from "../user-avatar";
import { QuizResultItem } from "./quiz-result-item";
import { ScoreBox } from "./score-box";

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
    <div className="mx-auto max-w-2xl grow p-6">
      <div className="flex items-center gap-2 py-10">
        <UserAvatar />
        <div className="font-accent font-medium">スバラシイ...</div>
      </div>
      <motion.div
        className="flex gap-1.5 *:flex-1 sm:gap-3"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { delayChildren: stagger(0.7) } } }}
      >
        <ScoreBox icon={ZapIcon} label="正解数" value={`${correctCount}/${totalCount}問`} />
        <ScoreBox icon={LightbulbIcon} label="正答率" value={`${roundedCorrectRate}%`} />
        <ScoreBox icon={Clock3Icon} label="プレイ時間" value={`${formatPlayTime(playTimeMs)}`} />
      </motion.div>
      {/* <div className="mt-6">
        <motion.div
          className="space-y-6"
          variants={{ show: { transition: { delayChildren: stagger(0.1) } } }}
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
      </div> */}
      <div className="sticky bottom-0 mt-6 bg-background py-4">
        <PlayfulButton asChild>
          <Link href="/puratto">OK</Link>
        </PlayfulButton>
      </div>
    </div>
  );
};
