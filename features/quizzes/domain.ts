import type { Quiz, QuizType } from "./types";

/**
 * Domain logic for quiz play, keyed off the discriminated union.
 * Narrowing on `quiz.type` narrows `quiz.params` to the matching shape (§4.3).
 */

const QUIZ_TYPE_LABELS: Record<QuizType, string> = {
  select: "選択問題",
  text: "テキスト",
  true_false: "○✗クイズ",
};

export function getQuizTypeLabel(type: QuizType): string {
  return QUIZ_TYPE_LABELS[type];
}

export function getQuizTypes(): { id: QuizType; label: string }[] {
  return (Object.keys(QUIZ_TYPE_LABELS) as QuizType[]).map((id) => ({ id, label: QUIZ_TYPE_LABELS[id] }));
}

/** Whether the current input is a submittable answer (not yet judged for correctness). */
export function validateQuizInput(quiz: Quiz, inputValue: string[]): boolean {
  switch (quiz.type) {
    case "select":
      return quiz.params.correctChoices.length > 0 && quiz.params.correctChoices.length === inputValue.length;
    case "text":
      return (inputValue[0]?.trim().length ?? 0) > 0;
    case "true_false": {
      const value = inputValue[0];
      return value === "true" || value === "false";
    }
  }
}

/** Whether the input is the correct answer. */
export function judgeQuizInput(quiz: Quiz, inputValue: string[]): boolean {
  switch (quiz.type) {
    case "select":
      return (
        inputValue.length === quiz.params.correctChoices.length &&
        quiz.params.correctChoices.every((choice) => inputValue.includes(choice))
      );
    case "text": {
      const normalizedInput = inputValue[0]?.trim().replace(/\s+/g, "") ?? "";
      return quiz.params.answer.split("\n").some((answer) => answer.trim().replace(/\s+/g, "") === normalizedInput);
    }
    case "true_false": {
      const value = inputValue[0];
      if (value === "true") return quiz.params.answer === true;
      if (value === "false") return quiz.params.answer === false;
      return false;
    }
  }
}

/** Instruction shown above the question. */
export function getQuizPrompt(quiz: Quiz): string {
  switch (quiz.type) {
    case "select": {
      const n = quiz.params.correctChoices.length;
      return `答えを${n > 1 ? `${n}つ` : ""}選択してください`;
    }
    case "text":
      return "答えを入力してください";
    case "true_false":
      return "○か✗を選択してください";
  }
}
