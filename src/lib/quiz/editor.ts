import z from "zod";
import { QuizData } from "./data";
import { splitByLines } from "../utils";

/**
 * Split a string by lines, trim each line, and remove empty lines.
 * Ignores whitespace and periods on each line.
 * @param str
 * @returns
 */
const looseSplitByLines = (str: string) =>
  splitByLines(str).map((line) => line.replace(/\s|\./g, ""));

const findDuplicates = (arr: string[]) => {
  const seen = new Set<string>();
  const dup = new Set<string>();
  for (const item of arr) {
    if (seen.has(item)) dup.add(item);
    else seen.add(item);
  }
  return Array.from(dup);
};

export const CommonQuizEditorSchema = z.object({
  id: z.number().nullable(),
  question: z
    .string()
    .min(1, "問題文を入力してください。")
    .max(1000, "問題文は1000文字以内で入力してください。"),
  explanation: z.string().optional(),
  isPublished: z.boolean(),
});

export const SelectQuizEditorSchema = CommonQuizEditorSchema.extend({
  type: z.literal("select"),
  correctChoicesText: z
    .string("正解の選択肢を入力してください。")
    .refine((val) => splitByLines(val).length > 0, {
      message: "正解の選択肢を入力してください。",
    })
    .transform((val) => splitByLines(val).join("\n")),
  incorrectChoicesText: z
    .string("不正解の選択肢を入力してください。")
    .refine((val) => splitByLines(val).length > 0, {
      message: "不正解の選択肢を入力してください。",
    })
    .transform((val) => splitByLines(val).join("\n")),
}).superRefine((val, ctx) => {
  const correct = splitByLines(val.correctChoicesText);
  const incorrect = splitByLines(val.incorrectChoicesText);

  const dupCorrect = findDuplicates(correct);
  const dupIncorrect = findDuplicates(incorrect);

  const incorrectSet = new Set(incorrect);
  const overlap = Array.from(
    new Set(correct.filter((c) => incorrectSet.has(c))),
  );

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

export const TextQuizEditorSchema = CommonQuizEditorSchema.extend({
  type: z.literal("text"),
  answer: z
    .string("解答を入力してください。")
    .refine((val) => splitByLines(val).length > 0, {
      message: "解答を入力してください。",
    })
    .superRefine((val, ctx) => {
      const answers = looseSplitByLines(val);
      const dup = findDuplicates(answers);
      if (dup.length > 0) {
        ctx.addIssue({
          code: "custom",
          message: `解答が重複しています: ${dup.join(", ")}`,
        });
      }
    })
    .transform((val) => Array.from(new Set(looseSplitByLines(val))).join("\n")),
});

export const TrueFalseQuizEditorSchema = CommonQuizEditorSchema.extend({
  type: z.literal("true_false"),
  answer: z.boolean("解答を選択してください。"),
});

export const QuizEditorSchema = z.discriminatedUnion("type", [
  SelectQuizEditorSchema,
  TextQuizEditorSchema,
  TrueFalseQuizEditorSchema,
]);

export type QuizValues = z.infer<typeof QuizEditorSchema>;
export type SelectQuizValues = z.infer<typeof SelectQuizEditorSchema>;
export type TextQuizValues = z.infer<typeof TextQuizEditorSchema>;
export type TrueFalseQuizValues = z.infer<typeof TrueFalseQuizEditorSchema>;

export function makePseudoQuiz(values: QuizValues): QuizData | null {
  const commonData = {
    id: -1,
    question: values.question,
    explanation: values.explanation ?? null,
    createdAt: new Date(),
    isPublished: values.isPublished,
  };

  if (values.type === "select") {
    return {
      ...commonData,
      type: values.type,
      correctChoices: splitByLines(values.correctChoicesText ?? ""),
      incorrectChoices: splitByLines(values.incorrectChoicesText ?? ""),
    };
  }
  if (values.type === "text") {
    return {
      ...commonData,
      type: values.type,
      answer: values.answer,
    };
  }
  if (values.type === "true_false") {
    return {
      ...commonData,
      type: values.type,
      answer: values.answer,
    };
  }
  return null;
}
