import { FullQuiz } from "./quiz-actions";

export type QuizResult = {
  quizId: number;
  userAnswer: string[];
  isCorrect: boolean;
};
