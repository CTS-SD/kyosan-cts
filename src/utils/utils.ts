import { quizzes } from "@/app/test/quizzes";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function getRandomQuiz(exceptIndexes?: number[]): Quiz {
  const filteredQuizzes = quizzes.filter((_, i) => !exceptIndexes?.includes(i));

  if (filteredQuizzes.length === 0) {
    const i = Math.floor(Math.random() * quizzes.length);
    return {
      ...quizzes[i],
      id: i,
    };
  }

  const index = Math.floor(Math.random() * filteredQuizzes.length);
  const actualIndex = quizzes.findIndex((q) => q === filteredQuizzes[index]);
  return { ...filteredQuizzes[index], id: actualIndex };
}

export const digit2alpha: { [key: number]: string } = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
  4: "E",
  5: "F",
  6: "G",
  7: "H",
  8: "I",
  9: "J",
  10: "K",
  11: "L",
  12: "M",
  13: "N",
  14: "O",
  15: "P",
  16: "Q",
  17: "R",
  18: "S",
  19: "T",
  20: "U",
  21: "V",
  22: "W",
  23: "X",
  24: "Y",
  25: "Z",
} as const;
