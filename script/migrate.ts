import { db } from "@/lib/db";
import { QuizTable, SelectQuizTable, TextQuizTable, TrueFalseQuizTable } from "@/lib/db/schema";
import { readFile } from "node:fs/promises";

main();

const typeMap = {
  select: "select",
  input: "text",
  ox: "true_false",
} as const;

async function main() {
  await db.delete(QuizTable);

  const quizzes = JSON.parse(await readFile("./script/data.json", "utf-8")).toReversed();

  for (const quiz of quizzes) {
    const t = typeMap[quiz.type as keyof typeof typeMap];
    if (!t) {
      console.warn(`Unknown quiz type: ${quiz.type}`);
      continue;
    }

    const [newQuiz] = await db
      .insert(QuizTable)
      .values({
        type: t,
        question: quiz.question,
        explanation: quiz.explanation,
        createdAt: new Date(quiz.createdAt),
        isPublished: quiz.isPublic,
      })
      .returning({ id: QuizTable.id });

    if (quiz.type === "select") {
      await db.insert(SelectQuizTable).values({
        quizId: newQuiz.id,
        correctChoices: [quiz.answer],
        incorrectChoices: quiz.fakes ?? [],
      });
    } else if (quiz.type === "input") {
      await db.insert(TextQuizTable).values({
        quizId: newQuiz.id,
        answer: quiz.answer,
      });
    } else if (quiz.type === "ox") {
      await db.insert(TrueFalseQuizTable).values({
        quizId: newQuiz.id,
        answer: quiz.answer === "__true__",
      });
    }
  }
}
