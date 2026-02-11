import { Clock3Icon, LightbulbIcon, SlashIcon, ZapIcon } from "lucide-react";
import { motion, stagger } from "motion/react";
import Link from "next/link";
import type { QuizData, QuizResult } from "../../lib/quiz";
import { PlayfulButton } from "../ui/playful-button";
import { SpeechBubble } from "../ui/speech-bubble";
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
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export const QuizResultsView = ({ quizzes, results, playTimeMs }: Props) => {
  const totalCount = quizzes.length;
  const correctCount = results.filter((r) => r.isCorrect).length;
  const correctRate = totalCount > 0 ? (correctCount / totalCount) * 100 : 0;
  const roundedCorrectRate = Number(correctRate.toFixed(1));

  return (
    <div className="mx-auto max-w-2xl grow p-6">
      <div className="mb-6 flex justify-center gap-2 py-6">
        <UserAvatar className="mt-4" />
        <SpeechBubble className="font-accent font-medium">いいね！</SpeechBubble>
      </div>
      <motion.div
        className="flex gap-1.5 *:flex-1 sm:gap-3"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { delayChildren: stagger(0.7) } } }}
      >
        <ScoreBox
          icon={ZapIcon}
          label="正解数"
          value={
            <div className="mx-auto flex w-fit items-baseline sm:gap-1">
              <span className="text-3xl">{correctCount}</span>
              <SlashIcon className="size-4 -rotate-16 text-muted-foreground" strokeWidth={2.8} />
              <div className="text-muted-foreground">
                <span className="mr-0.5">{totalCount}</span>
                <span className="text-lg">問</span>
              </div>
            </div>
          }
        />
        <ScoreBox
          icon={LightbulbIcon}
          label="正答率"
          value={
            <div className="mx-auto flex w-fit items-baseline gap-1">
              <span className="text-3xl">{roundedCorrectRate}</span>
              <span className="text-lg">%</span>
            </div>
          }
        />
        <ScoreBox
          icon={Clock3Icon}
          label="プレイ時間"
          value={<span className="text-3xl">{formatPlayTime(playTimeMs)}</span>}
        />
      </motion.div>
      <div className="mt-6">
        <div className="space-y-6">
          {results.map((result, i) => (
            <motion.div
              key={result.quizId}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 12, delay: 2.1 }}
            >
              <QuizResultItem index={i + 1} result={result} quiz={quizzes.find((q) => q.id === result.quizId)!} />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="sticky bottom-0 mt-6 bg-background py-4">
        <PlayfulButton tint="blue" asChild>
          <Link href="/puratto">OK</Link>
        </PlayfulButton>
      </div>
    </div>
  );
};
