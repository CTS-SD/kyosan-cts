export const quizTypes = [
  {
    label: "選択問題",
    id: "select",
    prompt: "答えを選択してください",
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
] as const satisfies ReadonlyArray<{
  label: string;
  id: string;
  prompt: string;
}>;

export function getQuizTypeLabel(type: string) {
  return quizTypes.find((quizType) => quizType.id === type)?.label ?? "不明";
}

export function getQuizPrompt(type: string) {
  return quizTypes.find((quizType) => quizType.id === type)?.prompt ?? "";
}
