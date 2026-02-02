import type { QuizData } from "./data";

export function judgeQuiz(quiz: QuizData, userAnswer: string[]): boolean {
  if (quiz.type === "select") {
    return (
      userAnswer.length === quiz.correctChoices.length &&
      quiz.correctChoices.every((choice) => userAnswer.includes(choice))
    );
  } else if (quiz.type === "text") {
    const value = userAnswer[0]?.trim().replace(/\s/, "") ?? "";
    return !!quiz.answer?.split("\n").includes(value);
  } else if (quiz.type === "true_false") {
    const value = userAnswer[0];
    if (value === "true") {
      return quiz.answer === true;
    } else if (value === "false") {
      return quiz.answer === false;
    }
    return false;
  }

  throw new Error("Unknown quiz type");
}
