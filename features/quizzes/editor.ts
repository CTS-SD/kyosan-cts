import { z } from "zod";
import { splitByLines } from "@/lib/utils";
import type { Quiz, QuizInput } from "./types";

const findDuplicates = (arr: string[]) => {
  const seen = new Set<string>();
  const dup = new Set<string>();
  for (const item of arr) {
    if (seen.has(item)) dup.add(item);
    else seen.add(item);
  }
  return Array.from(dup);
};

/** Split, trim and drop empties, also ignoring inner whitespace and periods (text answers). */
const looseSplitByLines = (str: string) => splitByLines(str).map((line) => line.replace(/\s|\./g, ""));

const editorBase = {
  id: z.number().nullable(),
  question: z.string().min(1, "問題文を入力してください。").max(1000, "問題文は1000文字以内で入力してください。"),
  explanation: z.string().nullable(),
  isPublished: z.boolean(),
};

export const SelectQuizEditorSchema = z
  .object({
    ...editorBase,
    type: z.literal("select"),
    correctChoicesText: z
      .string("正解の選択肢を入力してください。")
      .refine((val) => splitByLines(val).length > 0, { message: "正解の選択肢を入力してください。" })
      .transform((val) => splitByLines(val).join("\n")),
    incorrectChoicesText: z
      .string("不正解の選択肢を入力してください。")
      .refine((val) => splitByLines(val).length > 0, { message: "不正解の選択肢を入力してください。" })
      .transform((val) => splitByLines(val).join("\n")),
  })
  .superRefine((val, ctx) => {
    const correct = splitByLines(val.correctChoicesText);
    const incorrect = splitByLines(val.incorrectChoicesText);

    const dupCorrect = findDuplicates(correct);
    const dupIncorrect = findDuplicates(incorrect);

    const incorrectSet = new Set(incorrect);
    const overlap = Array.from(new Set(correct.filter((c) => incorrectSet.has(c))));

    if (dupCorrect.length > 0) {
      ctx.addIssue({
        code: "custom",
        path: ["correctChoicesText"],
        message: `選択肢が重複しています: ${dupCorrect.join(", ")}`,
      });
    }
    if (dupIncorrect.length > 0) {
      ctx.addIssue({
        code: "custom",
        path: ["incorrectChoicesText"],
        message: `選択肢が重複しています: ${dupIncorrect.join(", ")}`,
      });
    }
    if (overlap.length > 0) {
      ctx.addIssue({
        code: "custom",
        path: ["correctChoicesText"],
        message: `正解と不正解の選択肢が重複しています: ${overlap.join(", ")}`,
      });
      ctx.addIssue({
        code: "custom",
        path: ["incorrectChoicesText"],
        message: `正解と不正解の選択肢が重複しています: ${overlap.join(", ")}`,
      });
    }
  });

export const TextQuizEditorSchema = z.object({
  ...editorBase,
  type: z.literal("text"),
  textAnswer: z
    .string("解答を入力してください。")
    .refine((val) => splitByLines(val).length > 0, { message: "解答を入力してください。" })
    .superRefine((val, ctx) => {
      const answers = looseSplitByLines(val);
      const dup = findDuplicates(answers);
      if (dup.length > 0) {
        ctx.addIssue({ code: "custom", message: `解答が重複しています: ${dup.join(", ")}` });
      }
    })
    .transform((val) => Array.from(new Set(looseSplitByLines(val))).join("\n")),
});

export const TrueFalseQuizEditorSchema = z.object({
  ...editorBase,
  type: z.literal("true_false"),
  trueFalseAnswer: z.boolean("解答を選択してください。"),
});

export const QuizEditorSchema = z.discriminatedUnion("type", [
  SelectQuizEditorSchema,
  TextQuizEditorSchema,
  TrueFalseQuizEditorSchema,
]);

export type QuizEditorValues = z.infer<typeof QuizEditorSchema>;

/** Quiz → editor form values. */
export function toEditorValues(quiz: Quiz): QuizEditorValues {
  const base = {
    id: quiz.id,
    question: quiz.question,
    explanation: quiz.explanation,
    isPublished: quiz.isPublished,
  };
  switch (quiz.type) {
    case "select":
      return {
        ...base,
        type: "select",
        correctChoicesText: quiz.params.correctChoices.join("\n"),
        incorrectChoicesText: quiz.params.incorrectChoices.join("\n"),
      };
    case "text":
      return { ...base, type: "text", textAnswer: quiz.params.answer };
    case "true_false":
      return { ...base, type: "true_false", trueFalseAnswer: quiz.params.answer };
  }
}

/** Editor form values → mutation payload (type + question + params jsonb). */
export function fromEditorValues(values: QuizEditorValues): QuizInput {
  const base = {
    question: values.question,
    explanation: values.explanation,
    isPublished: values.isPublished,
  };
  switch (values.type) {
    case "select":
      return {
        ...base,
        type: "select",
        params: {
          correctChoices: splitByLines(values.correctChoicesText),
          incorrectChoices: splitByLines(values.incorrectChoicesText),
        },
      };
    case "text":
      return { ...base, type: "text", params: { answer: values.textAnswer } };
    case "true_false":
      return { ...base, type: "true_false", params: { answer: values.trueFalseAnswer } };
  }
}

/** Build a transient Quiz for live editor preview (id = -1). */
export function makePseudoQuiz(values: QuizEditorValues): Quiz {
  const payload = fromEditorValues(values);
  return { id: -1, createdAt: new Date(), ...payload } as Quiz;
}
