import { motion } from "motion/react";
import { useState } from "react";
import { PlayfulButton } from "@/components/ui/playful-button";
import { cn } from "@/lib/utils";
import { Markdown } from "./markdown";
import { QuizAnswerRenderer } from "./quiz-answer-renderer";
import { useQuizPlay } from "./quiz-play";

export const QuizPlayResult = () => {
  const { result, quiz } = useQuizPlay();
  const [showExplanation, setShowExplanation] = useState(false);

  const hasExplanation = !!quiz.explanation;

  if (!result) return null;

  return (
    <motion.div
      className={cn("overflow-clip", result.isCorrect ? "text-green-500" : "text-red-500")}
      initial={{ height: 0 }}
      animate={{ height: "auto" }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 38,
      }}
    >
      <div className="flex flex-col">
        <div className="mb-4 space-y-3">
          <div className="flex items-center gap-1.5 font-bold text-2xl transition-colors [&_svg]:size-6.5">
            {result.isCorrect ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
                </svg>
                <span>正解</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-6.489 5.8a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" />
                </svg>
                <span>不正解</span>
              </>
            )}
          </div>
          {!result.isCorrect && (
            <div className="flex items-center gap-2">
              <div className="shrink-0 font-semibold">正解：</div>
              <div className="font-bold">
                <QuizAnswerRenderer quiz={quiz} />
              </div>
            </div>
          )}
        </div>
        {quiz.explanation && (
          <motion.div
            className="h-0 max-h-[30dvh] overflow-scroll opacity-0"
            animate={{
              height: showExplanation ? "auto" : 0,
              opacity: showExplanation ? 1 : 0,
              scale: showExplanation ? 1 : 0.95,
            }}
            transition={{
              ease: [0, 0, 0.2, 1],
            }}
          >
            <Markdown className="mb-4 text-inherit">{quiz.explanation}</Markdown>
          </motion.div>
        )}
        {hasExplanation && (
          <PlayfulButton
            type="button"
            tint={result.isCorrect ? "green" : "red"}
            variant="outline"
            className="mb-2"
            onClick={() => setShowExplanation((prev) => !prev)}
          >
            {showExplanation ? "閉じる" : "解説を表示"}
          </PlayfulButton>
        )}
      </div>
    </motion.div>
  );
};
