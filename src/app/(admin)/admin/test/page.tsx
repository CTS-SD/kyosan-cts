"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { client } from "@/db/hono";
import { type Quiz } from "@/db/schema";
import { PlusIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import QuizForm from "./QuizForm";
import QuizListItem from "./QuizListItem";
import TestPageHeading from "./TestPageHeading";

const Page = () => {
  const [activeQuiz, setActiveQuiz] = useState<Quiz>();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");

  // const filteredQuizzes = quizzes.filter((q) => {
  //   if (filter === "") {
  //     return true;
  //   }
  //   return q.question.includes(filter);
  // });

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((q) => {
      if (filter === "") {
        return true;
      }
      return q.question.includes(filter);
    });
  }, [quizzes, filter]);

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
            <Drawer
              direction="right"
              repositionInputs={false}
              onOpenChange={(open) => setIsCreateDialogOpen(open)}
              open={isCreateDialogOpen}
            >
              <DrawerTrigger className="" asChild>
                <Button className="rounded-md shrink-0" size="icon">
                  <PlusIcon size={20} />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="overflow-auto right-0 w-[min(560px,95%)] lg:w-[1024px] rounded-l-xl rounded-r-none left-auto top-0 bottom-0 fixed flex">
                <div className="grow p-6">
                  <QuizForm
                    onSaved={(quiz) => {
                      setQuizzes([quiz, ...quizzes]);
                      setIsCreateDialogOpen(false);
                    }}
                  />
                </div>
              </DrawerContent>
            </Drawer>
          </div>
          {isLoading ? (
            <div className="w-full text-center pt-20">Loading...</div>
          ) : (
            <ul className="grid gap-2 mt-6 md:grid-cols-2 lg:grid-cols-3">
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
          )}
        </div>
      </div>
      <Drawer
        repositionInputs={false}
        direction="right"
        onOpenChange={(open) => setIsEditDialogOpen(open)}
        open={isEditDialogOpen}
      >
        <DrawerContent className="right-0 w-[min(1024px,95%)] rounded-l-xl rounded-r-none left-auto top-0 bottom-0 flex overflow-y-auto">
          <div className="grow p-6">
            <QuizForm
              quiz={activeQuiz}
              isEdit
              onDeleted={() => setIsEditDialogOpen(false)}
              onSaved={(quiz) => {
                setQuizzes(quizzes.map((q) => (q.id === quiz.id ? quiz : q)));
              }}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Page;
