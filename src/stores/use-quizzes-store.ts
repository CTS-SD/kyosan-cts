import { QuizData } from "@/lib/quiz/data";
import { create } from "zustand";

type QuizzesStore = {
  quizzes: QuizData[];
  setQuizzes: (quizzes: QuizData[]) => void;
};

export const useQuizzesStore = create<QuizzesStore>((set) => ({
  quizzes: [],
  setQuizzes: (quizzes) => set({ quizzes }),
}));
