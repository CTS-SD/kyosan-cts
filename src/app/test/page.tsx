"use client";

import { createContext, useState } from "react";
import { quizes } from "./quizes";
import { getRandomQuiz, shuffle } from "@/utils/utils";
import QuizFormSelect from "./QuizFormSelect";
import QuizResult from "./QuizResult";
import QuizFormInput from "./QuizFormInput";
import FinalResult from "./FinalResult";
import StartPage from "./StartPage";

export const QuizFormContext = createContext<{
  value: string | null | boolean;
  setValue: (value: string | null | boolean) => void;
  isShowResult: boolean;
}>({
  value: null,
  setValue: () => {},
  isShowResult: false,
});

const roundMax = 5;

type Page = "start" | "quiz" | "result";

export default function Home() {
  const [round, setRound] = useState(1);
  const [quiz, setQuiz] = useState<Quiz>(getRandomQuiz());
  const [page, setPage] = useState<Page>("start");
  const [isShowResult, setIsShowResult] = useState(false);
  const [result, setResult] = useState<Result>();
  const [results, setResults] = useState<Result[]>([]);
  const [value, setValue] = useState<string | null | boolean>(null);

  const showResult = (result: boolean, userAns: string) => {
    setIsShowResult(true);
    const r = {
      correct: result,
      userAnswer: userAns,
      quiz: quiz,
    };
    setResult(r);
    setResults((prev) => [...prev, r]);
  };

  const handleNext = () => {
    setRound(round + 1);
    setQuiz(getRandomQuiz());
    setIsShowResult(false);
    setValue(null);
  };

  const resetQuizStates = () => {
    setRound(1);
    setQuiz(getRandomQuiz());
    setResults([]);
    setValue(null);
    setIsShowResult(false);
  };

  return (
    <main className="min-h-screen flex flex-col max-w-lg mx-auto">
      <div className="p-4 grow flex flex-col">
        {page == "start" && <StartPage onStart={() => setPage("quiz")} />}
        {page == "result" && (
          <FinalResult
            results={results}
            onRetry={() => {
              resetQuizStates();
              setPage("start");
            }}
          />
        )}
        {page == "quiz" && (
          <>
            <div className="bg-neutral-100 px-4 pt-3 pb-4 border rounded-2xl">
              <div className="flex items-baseline gap-2 font-bold">
                <div className="text-lg">Q {round}</div>
                <div className="text-sm text-neutral-400">/ {roundMax}</div>
              </div>
              <div className="text-lg leading-snug font-semibold rounded-lg mt-3">
                {quiz.question}
              </div>
            </div>
            <QuizFormContext.Provider value={{ value, setValue, isShowResult }}>
              <div className="mt-4">
                {quiz.type === "select" && (
                  <QuizFormSelect quiz={quiz} showResult={showResult} />
                )}
                {quiz.type === "input" && (
                  <QuizFormInput quiz={quiz} showResult={showResult} />
                )}
              </div>
            </QuizFormContext.Provider>
            {isShowResult && (
              <QuizResult
                isFinal={round === roundMax}
                result={result}
                onNext={handleNext}
                onFinal={() => setPage("result")}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
}
