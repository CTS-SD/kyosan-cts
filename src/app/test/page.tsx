"use client";

import { createContext, useState } from "react";
import { quizes } from "./quizes";
import { getRandomQuiz, shuffle } from "@/utils/utils";
import QuizFormSelect from "./QuizFormSelect";
import QuizResult from "./QuizResult";
import QuizFormInput from "./QuizFormInput";
import FinalResult from "./FinalResult";
import StartPage from "./StartPage";
import { Progress } from "@/components/ui/progress";

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
    setRound(round + 1);
  };

  const handleNext = () => {
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
            <Progress value={((round - 1) / roundMax) * 100} className="mt-2" />
            <div className="text-lg leading-snug font-semibold rounded-lg mt-3 py-8 px-2">
              {quiz.question}
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
                isFinal={round - 1 === roundMax}
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
