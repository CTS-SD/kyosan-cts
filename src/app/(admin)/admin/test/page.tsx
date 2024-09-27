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
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";
import TestPageHeading from "./TestPageHeading";

const Page = () => {
  const [activeQuiz, setActiveQuiz] = useState<Quiz>();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const filteredQuizzes = quizzes.filter((q) => {
    if (filter === "") {
      return true;
    }
    return q.question.includes(filter);
  });

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
    <>
      <TestPageHeading />
      <div className="bg-neutral-50">
        <div className="max-w-5xl mx-auto min-h-[calc(100dvh_-_221px)] p-6">
          <div className="flex gap-3">
            <Input
              className="w-full"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="問題を検索"
            />
            <Dialog
              onOpenChange={(open) => setIsCreateDialogOpen(open)}
              open={isCreateDialogOpen}
            >
              <DialogTrigger className="" asChild>
                <Button className="rounded-md shrink-0" size="icon">
                  <PlusIcon size={20} />
                </Button>
              </DialogTrigger>
              <DialogContent className="p-4">
                <DialogHeader>
                  <DialogTitle>問題を作成</DialogTitle>
                </DialogHeader>
                <QuizForm
                  setQuizzes={setQuizzes}
                  onDeleted={() => setIsCreateDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
          {isLoading ? (
            <div className="w-full text-center pt-20">Loading...</div>
          ) : (
            <>
              <ul className="grid gap-2 mt-6 sm:grid-cols-2 md:grid-cols-3">
                {filteredQuizzes.map((quiz) => (
                  <QuizListItem
                    key={quiz.id}
                    quiz={quiz}
                    onClick={() => {
                      setActiveQuiz(quiz);
                      setIsEditDialogOpen(true);
                    }}
                  />
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
      <Dialog
        onOpenChange={(open) => setIsEditDialogOpen(open)}
        open={isEditDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>問題を編集</DialogTitle>
          </DialogHeader>
          <QuizForm
            quiz={activeQuiz}
            isEdit
            setQuizzes={setQuizzes}
            onDeleted={() => setIsEditDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Page;
