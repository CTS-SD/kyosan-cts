import type { QuizData } from "./data";

export function validateQuizInput(quiz: QuizData, inputValue: string[]) {
  if (quiz.type === "select") {
    return quiz.correctChoices.length === inputValue.length;
  } else if (quiz.type === "text") {
    return inputValue[0]?.trim().length > 0;
  } else if (quiz.type === "true_false") {
    const value = inputValue[0];
    return value === "true" || value === "false";
  }

  throw new Error("Unknown quiz type");
}

export function judgeQuizInput(quiz: QuizData, inputValue: string[]): boolean {
  if (quiz.type === "select") {
    return (
      inputValue.length === quiz.correctChoices.length &&
      quiz.correctChoices.every((choice) => inputValue.includes(choice))
    );
  } else if (quiz.type === "text") {
    const value = inputValue[0]?.trim().replace(/\s/, "") ?? "";
    return !!quiz.answer?.split("\n").includes(value);
  } else if (quiz.type === "true_false") {
    const value = inputValue[0];
    if (value === "true") {
      return quiz.answer === true;
    } else if (value === "false") {
      return quiz.answer === false;
    }
    return false;
  }

  throw new Error("Unknown quiz type");
}
