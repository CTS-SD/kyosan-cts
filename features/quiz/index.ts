export {
  deleteQuiz,
  getQuizById,
  getQuizListStats,
  getQuizzes,
  getTags,
  insertQuiz,
  searchQuizzes,
  updateQuiz,
} from "./actions";
export { saveQuizSession } from "./actions/session";
export type { DailySessionTrend, PerQuizAccuracy, SessionSummary } from "./actions/stats";
export {
  getDailySessionTrend,
  getPerQuizAccuracy,
  getSessionSummary,
} from "./actions/stats";
export type { QuizEditorValues } from "./domain/editor";
export {
  CommonQuizEditorSchema,
  QuizEditorSchema,
  SelectQuizEditorSchema,
  TextQuizEditorSchema,
  TrueFalseQuizEditorSchema,
} from "./domain/editor";
export {
  getQuizHandler,
  getQuizPrompt,
  getQuizTypeLabel,
  getQuizTypes,
  judgeQuizInput,
  validateQuizInput,
} from "./domain/handlers";
export type { SelectQuizEditorValues } from "./domain/handlers/select";
export type { TextQuizEditorValues } from "./domain/handlers/text";
export type { TrueFalseQuizEditorValues } from "./domain/handlers/true-false";
export type {
  Quiz,
  QuizType,
  SelectQuiz,
  TextQuiz,
  TrueFalseQuiz,
} from "./domain/types";
export {
  CommonQuizSchema,
  SelectQuizSchema,
  TextQuizSchema,
  TrueFalseQuizSchema,
} from "./domain/types";

import type { QuizEditorValues } from "./domain/editor";
import { getQuizHandler } from "./domain/handlers";
import type { Quiz } from "./domain/types";

export function toEditorValues(quiz: Quiz): QuizEditorValues {
  const handler = getQuizHandler(quiz.type);
  return handler.toEditorValues(quiz as never);
}

export function fromEditorValues(values: QuizEditorValues): Partial<Quiz> {
  const handler = getQuizHandler(values.type);
  return handler.fromEditorValues(values as never);
}

export function makePseudoQuiz(values: QuizEditorValues): Quiz | null {
  const commonData = {
    id: -1,
    question: values.question,
    explanation: values.explanation ?? null,
    createdAt: new Date(),
    isPublished: values.isPublished,
    tags: values.tags ?? [],
  };

  const handler = getQuizHandler(values.type);
  const typeSpecificData = handler.fromEditorValues(values as never);

  return { ...commonData, ...typeSpecificData } as Quiz;
}

export type QuizResult = {
  quizId: number;
  userAnswer: string[];
  isCorrect: boolean;
};
