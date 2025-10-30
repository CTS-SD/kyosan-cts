import { QuizResult } from "@/lib/quiz-form";
import { QuizData } from "@/lib/quiz/data";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { QuizAnswerRenderer } from "../quiz-answer-renderer";

type Props = {
  result: QuizResult;
  quiz: QuizData;
};

export const QuizPlayResult = ({ result, quiz }: Props) => {
  return (
    <motion.div
      className={cn(
        "absolute right-0 bottom-0 left-0 -z-1 flex flex-col gap-1.5 px-6 pt-3 pb-17",
        result.isCorrect
          ? "bg-green-50 text-green-500"
          : "bg-red-50 text-red-500",
      )}
      initial={{ opacity: 0, translateY: "100%" }}
      animate={{ opacity: 1, translateY: "0%" }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 38,
      }}
    >
      <div
        className={cn(
          "flex items-center gap-1.5 text-2xl font-bold transition-colors [&_svg]:size-6.5",
        )}
      >
        {result.isCorrect ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
            </svg>
            <span>正解</span>
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-6.489 5.8a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" />
            </svg>
            <span>不正解</span>
          </>
        )}
      </div>
      {!result.isCorrect && (
        <div className="flex gap-2">
          <div className="font-semibold">正解:</div>
          <QuizAnswerRenderer className="font-bold" quiz={quiz} />
        </div>
      )}
    </motion.div>
  );
};
