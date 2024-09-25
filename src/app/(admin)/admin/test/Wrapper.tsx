"use client";

import { type Quiz } from "@/db/schema";
import QuizListItem from "./QuizListItem";
import { useState } from "react";
import QuizForm from "./QuizForm";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

type Props = {
  quizList: Quiz[];
};

const Wrapper = ({ quizList }: Props) => {
  const [activeQuiz, setActiveQuiz] = useState<Quiz>(quizList[0]);
  const [quizzes, setQuizzes] = useState<Quiz[]>(quizList);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="max-w-lg mx-auto">
      <div className="p-4">
        <h1 className="font-bold text-xl">問題一覧</h1>
        <div>
          <Drawer>
            <DrawerTrigger className="w-full">
              <Button className="w-full mt-4" size="sm" variant="outline">
                + 新規作成
              </Button>
            </DrawerTrigger>
            <DrawerContent className="p-4">
              <DrawerHeader>
                <DrawerTitle>問題を作成</DrawerTitle>
              </DrawerHeader>
              <QuizForm setQuizzes={setQuizzes} />
            </DrawerContent>
          </Drawer>
        </div>
        <ul className="flex flex-col gap-2 mt-4">
          {quizzes.map((quiz) => (
            <QuizListItem
              key={quiz.id}
              quiz={quiz}
              onClick={() => {
                setActiveQuiz(quiz);
                setIsDrawerOpen(true);
              }}
            />
          ))}
        </ul>
      </div>
      <Drawer
        onOpenChange={(open) => setIsDrawerOpen(open)}
        open={isDrawerOpen}
      >
        <DrawerContent className="max-w-lg mx-auto p-4">
          <QuizForm quiz={activeQuiz} isEdit setQuizzes={setQuizzes} />
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Wrapper;
