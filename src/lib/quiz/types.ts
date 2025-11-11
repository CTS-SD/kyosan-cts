import { QuizData } from "./data";

export const quizTypes = [
  {
    label: "選択問題",
    id: "select",
    prompt: (count: number) => `答えを${count > 1 ? `${count}つ` : ""}選択してください`,
  },
  {
    label: "テキスト",
    id: "text",
    prompt: "答えを入力してください",
  },
  {
    label: "○✗クイズ",
    id: "true_false",
    prompt: "○か✗を選択してください",
  },
] as const;

export function getQuizTypeLabel(type: string) {
  return quizTypes.find((quizType) => quizType.id === type)?.label ?? "不明";
}

export function getQuizPrompt(quiz: QuizData) {
  if (quiz.type === "select") {
    return quizTypes.find((type) => type.id === quiz.type)?.prompt(quiz.correctChoices.length);
  }
  return quizTypes.find((type) => type.id === quiz.type)?.prompt as string;
}
