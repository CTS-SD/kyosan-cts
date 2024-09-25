"use client";

import { createContext, useState } from "react";
import { getRandomQuiz, shuffle } from "@/utils/utils";
import QuizFormSelect from "./QuizFormSelect";
import QuizResult from "./QuizResult";
import QuizFormInput from "./QuizFormInput";
import FinalResult from "./FinalResult";
import StartPage from "./StartPage";
import { Progress } from "@/components/ui/progress";
import QuizFormOX from "./QuizFormOX";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const QuizFormContext = createContext<{
  value: string | null | boolean;
  setValue: (value: string | null | boolean) => void;
  isShowResult: boolean;
  showResult: (result: boolean, ans: string | boolean) => void;
}>({
  value: null,
  setValue: () => {},
  isShowResult: false,
  showResult: () => {},
});

const roundMax = 5;

type Page = "start" | "quiz" | "result";

export default function Home() {
  const [round, setRound] = useState(1);
  const [quiz, setQuiz] = useState<Quiz>({
    id: 0,
    question: "",
    type: "input",
    answer: "",
  });
  const [page, setPage] = useState<Page>("start");
  const [isShowResult, setIsShowResult] = useState(false);
  const [result, setResult] = useState<Result>();
  const [results, setResults] = useState<Result[]>([]);
  const [value, setValue] = useState<string | null | boolean>(null);

  const showResult = (result: boolean, userAns: string | boolean) => {
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
    console.log("Next");
    setQuiz(getRandomQuiz(results.map((r) => r.quiz.id)));
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
    <main className="min-h-screen flex flex-col max-w-lg mx-auto relative">
      <div className="p-4 grow flex flex-col">
        {page == "start" && (
          <StartPage
            onStart={() => {
              setQuiz(getRandomQuiz());
              setPage("quiz");
            }}
          />
        )}
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
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="icon" variant="ghost" className="shrink-0">
                    <XIcon />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>テストを中止</DialogTitle>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      onClick={() => {
                        resetQuizStates();
                        setPage("start");
                      }}
                    >
                      中止する
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Progress value={((round - 1) / roundMax) * 100} />
            </div>
            <div className="text-lg leading-snug font-semibold rounded-lg py-10 px-2">
              {quiz.question}
            </div>
            <QuizFormContext.Provider
              value={{ showResult, value, setValue, isShowResult }}
            >
              <div className="">
                {quiz.type === "select" && <QuizFormSelect quiz={quiz} />}
                {quiz.type === "input" && <QuizFormInput quiz={quiz} />}
                {quiz.type === "ox" && <QuizFormOX quiz={quiz} />}
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
