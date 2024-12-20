import { createContext } from "react";

export const QuizFormContext = createContext<{
  value: string | null;
  setValue: (value: string | null) => void;
  isShowResult: boolean;
  showResult: (result: boolean, ans: string) => void;
  isPreview?: boolean;
}>({
  value: null,
  setValue: () => {},
  isShowResult: false,
  showResult: () => {},
  isPreview: false,
});
