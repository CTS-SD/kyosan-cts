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
export type { SelectQuizEditorValues } from "./domain/handlers/select.handler";
export type { TextQuizEditorValues } from "./domain/handlers/text.handler";
export type { TrueFalseQuizEditorValues } from "./domain/handlers/true-false.handler";
export type {
  QuizData,
  QuizType,
  SelectQuizData,
  TextQuizData,
  TrueFalseQuizData,
} from "./domain/types";
export {
  CommonQuizSchema,
  SelectQuizSchema,
  TextQuizSchema,
  TrueFalseQuizSchema,
} from "./domain/types";

import type { QuizEditorValues } from "./domain/editor";
import { getQuizHandler } from "./domain/handlers";
import type { QuizData } from "./domain/types";

export function toEditorValues(quiz: QuizData): QuizEditorValues {
  const handler = getQuizHandler(quiz.type);
  return handler.toEditorValues(quiz as never);
}

export function fromEditorValues(values: QuizEditorValues): Partial<QuizData> {
  const handler = getQuizHandler(values.type);
  return handler.fromEditorValues(values as never);
}

export function makePseudoQuiz(values: QuizEditorValues): QuizData | null {
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

  return { ...commonData, ...typeSpecificData } as QuizData;
}

export type { QuizResult } from "../quiz-form";
export { saveQuizSession } from "./session-actions";
export type { DailySessionTrend, PerQuizAccuracy, SessionSummary } from "./session-stats-actions";
export {
  getDailySessionTrend,
  getPerQuizAccuracy,
  getSessionSummary,
} from "./session-stats-actions";
