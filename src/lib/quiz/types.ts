export enum QuizTypeEnum {
  SELECT = "select",
  TEXT = "text",
  TRUE_FALSE = "true_false",
}

export const quizTypes = [
  {
    label: "選択問題",
    id: QuizTypeEnum.SELECT,
    prompt: "答えを選択してください",
  },
  {
    label: "テキスト",
    id: QuizTypeEnum.TEXT,
    prompt: "答えを入力してください",
  },
  {
    label: "○✗クイズ",
    id: QuizTypeEnum.TRUE_FALSE,
    prompt: "○か✗を選択してください",
  },
] as const satisfies ReadonlyArray<{
  label: string;
  id: QuizTypeEnum;
  prompt: string;
}>;

export function getQuizTypeLabel(type: string) {
  return quizTypes.find((quizType) => quizType.id === type)?.label ?? "不明";
}

export function getQuizPrompt(type: string) {
  return quizTypes.find((quizType) => quizType.id === type)?.prompt ?? "";
}
