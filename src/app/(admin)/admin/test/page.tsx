"use client";

import { type Quiz } from "@/db/schema";
import QuizListItem from "./QuizListItem";
import { useEffect, useState } from "react";
import QuizForm from "./QuizForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { client } from "@/db/hono";

const Page = () => {
  const [activeQuiz, setActiveQuiz] = useState<Quiz>();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const res = await client.api.admin.quiz.$get();
      if (!res.ok) {
        return;
      }
      const data = await res.json();
      setQuizzes(data);
      setIsLoading(false);
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="max-w-lg mx-auto">
      <div className="p-4">
        <h1 className="font-bold text-xl">問題一覧</h1>
        {isLoading ? (
          <div className="w-full text-center pt-20">Loading...</div>
        ) : (
          <>
            <div>
              <Dialog>
                <DialogTrigger className="w-full" asChild>
                  <Button className="w-full mt-4" size="sm" variant="outline">
                    + 新規作成
                  </Button>
                </DialogTrigger>
                <DialogContent className="p-4">
                  <DialogHeader>
                    <DialogTitle>問題を作成</DialogTitle>
                  </DialogHeader>
                  <QuizForm setQuizzes={setQuizzes} />
                </DialogContent>
              </Dialog>
            </div>
            <ul className="flex flex-col gap-2 mt-4">
              {quizzes.map((quiz) => (
                <QuizListItem
                  key={quiz.id}
                  quiz={quiz}
                  onClick={() => {
                    setActiveQuiz(quiz);
                    setIsDialogOpen(true);
                  }}
                />
              ))}
            </ul>
          </>
        )}
      </div>
      <Dialog
        onOpenChange={(open) => setIsDialogOpen(open)}
        open={isDialogOpen}
      >
        <DialogContent className="max-w-lg mx-auto p-4">
          <DialogHeader>
            <DialogTitle>問題を編集</DialogTitle>
          </DialogHeader>
          <QuizForm quiz={activeQuiz} isEdit setQuizzes={setQuizzes} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;
