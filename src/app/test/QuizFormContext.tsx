import { createContext } from "react";

export const QuizFormContext = createContext<{
  value: string | null | boolean;
  setValue: (value: string | null | boolean) => void;
  isShowResult: boolean;
  showResult: (result: boolean, ans: string | boolean) => void;
}>({
  value: null,
  setValue: () => {},
  isShowResult: false,
  showResult: () => {},
});
