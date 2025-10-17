export const quizTypes = [
  {
    label: "選択問題",
    id: "select",
  },
  {
    label: "テキスト",
    id: "text",
  },
  {
    label: "○Xクイズ",
    id: "true_false",
  },
];

export function getQuizTypeLabel(type: string) {
  return quizTypes.find((quizType) => quizType.id === type)?.label ?? "不明";
}
