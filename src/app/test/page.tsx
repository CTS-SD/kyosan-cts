"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { client } from "@/db/hono";
import { Quiz } from "@/db/schema";
import { XIcon } from "lucide-react";
import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "../(user)/Header";
import FinalResult from "./FinalResult";
import { QuizFormContext } from "./QuizFormContext";
import QuizFormInput from "./QuizFormInput";
import QuizFormOX from "./QuizFormOX";
import QuizFormSelect from "./QuizFormSelect";
import QuizResult from "./QuizResult";
import StartPage from "./StartPage";

type Page = "start" | "quiz" | "result";

export type Result = {
  correct: boolean;
  userAnswer: string;
  quiz: Quiz;
};

export default function Home() {
  const [round, setRound] = useState(0);
  const [roundMax, setRoundMax] = useState(0);
  const [passingScore, setPassingScore] = useState(0);
  const [quiz, setQuiz] = useState<Quiz>();
  const [quizList, setQuizList] = useState<Quiz[]>([]);
  const [page, setPage] = useState<Page>("start");
  const [isShowResult, setIsShowResult] = useState(false);
  const [result, setResult] = useState<Result>();
  const [results, setResults] = useState<Result[]>([]);
  const [value, setValue] = useState<string | null>(null);

  const showResult = (result: boolean, userAns: string) => {
    if (!quiz) return;

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
    setQuiz(quizList[round]);
    setIsShowResult(false);
    setValue(null);
  };

  const resetQuizStates = async () => {
    setRound(0);
    await fetchQuizzes();
    setResults([]);
    setValue(null);
    setIsShowResult(false);
  };

  const fetchQuizzes = async () => {
    const res = await client.api.quiz.$get();
    if (!res.ok) {
      console.error("error");
      return;
    }
    const data = await res.json();
    setQuizList(data.quizzes);
    setQuiz(data.quizzes[0]);
    setRoundMax(data.quizzes.length);
    setPassingScore(data.passingScore);
  };

  return (
    <>
      {["start", "result"].includes(page) && <Header />}
      <main className="min-h-[100dvh] flex flex-col max-w-lg mx-auto relative">
        <title>ぷらっとテスト</title>
        <div className="p-4 grow flex flex-col">
          {page == "start" && (
            <StartPage
              onStart={async () => {
                await resetQuizStates();
                setPage("quiz");
              }}
            />
          )}
          {page == "result" && (
            <FinalResult
              results={results}
              onRetry={() => {
                setPage("start");
              }}
              passingScore={passingScore}
            />
          )}
          {page == "quiz" && quiz && (
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
                          setPage("start");
                        }}
                      >
                        中止する
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Progress value={(round / roundMax) * 100} />
              </div>
              <div className="text-lg leading-snug font-semibold rounded-lg py-10 px-2">
                <Markdown remarkPlugins={[remarkGfm]}>{quiz.question}</Markdown>
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
    </>
  );
}
