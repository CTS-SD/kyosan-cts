import { SelectQuizTable, TextQuizTable, TrueFalseQuizTable } from "../db/schema";
import { splitByLines } from "../utils";
import { SelectQuizSchema, TextQuizSchema, TrueFalseQuizSchema } from "./data";
import { type QuizValues, SelectQuizEditorSchema, TextQuizEditorSchema, TrueFalseQuizEditorSchema } from "./editor";

export const quizTypeHandlers = {
  select: {
    table: SelectQuizTable,
    dataSchema: SelectQuizSchema,
    editorSchema: SelectQuizEditorSchema,
    buildPayload: (quizId: number, values: QuizValues) => {
      const { correctChoicesText, incorrectChoicesText } = SelectQuizEditorSchema.parse(values);
      return {
        quizId,
        correctChoices: splitByLines(correctChoicesText),
        incorrectChoices: splitByLines(incorrectChoicesText),
      };
    },
  },
  text: {
    table: TextQuizTable,
    dataSchema: TextQuizSchema,
    editorSchema: TextQuizEditorSchema,
    buildPayload: (quizId: number, values: QuizValues) => {
      const { textAnswer } = TextQuizEditorSchema.parse(values);
      return {
        quizId,
        answer: textAnswer,
      };
    },
  },
  true_false: {
    table: TrueFalseQuizTable,
    dataSchema: TrueFalseQuizSchema,
    editorSchema: TrueFalseQuizEditorSchema,
    buildPayload: (quizId: number, values: QuizValues) => {
      const { trueFalseAnswer } = TrueFalseQuizEditorSchema.parse(values);
      return {
        quizId,
        answer: trueFalseAnswer,
      };
    },
  },
} as const;

export function getQuizHandler(type: QuizValues["type"]) {
  const handler = quizTypeHandlers[type];
  if (!handler) {
    throw new Error(`No handler found for quiz type: ${type}`);
  }
  return handler;
}
