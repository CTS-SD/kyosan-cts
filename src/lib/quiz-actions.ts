"use server";

import { eq, sql } from "drizzle-orm";
import { db } from "./db";
import {
  QuizTable,
  SelectQuizTable,
  TextQuizTable,
  TFQuizTable,
} from "./db/schema/quiz";
import { QuizFormValues } from "./quiz-editor";

export async function createQuiz(values: QuizFormValues) {
  const quizData = {
    type: values.type,
    question: values.question,
    explanation: values.explanation,
    isPublished: values.isPublished,
  };

  const [{ id: quizId }] = await db
    .insert(QuizTable)
    .values(quizData)
    .returning({
      id: QuizTable.id,
    });

  if (values.type === "select") {
    await db.insert(SelectQuizTable).values({
      quizId,
      correctChoicesText: values.correctChoicesText,
      incorrectChoicesText: values.incorrectChoicesText,
    });
  } else if (values.type === "true_false") {
    await db.insert(TFQuizTable).values({
      quizId,
      answer: values.answer,
    });
  } else if (values.type === "text") {
    await db.insert(TextQuizTable).values({
      quizId,
      answer: values.answer,
    });
  }

  return quizId;
}

export async function updateQuiz(quizId: number, values: QuizFormValues) {
  await db
    .update(QuizTable)
    .set({
      type: values.type,
      question: values.question,
      explanation: values.explanation,
      isPublished: values.isPublished,
    })
    .where(eq(QuizTable.id, quizId));

  if (values.type === "select") {
    const payload = {
      quizId,
      correctChoicesText: values.correctChoicesText,
      incorrectChoicesText: values.incorrectChoicesText,
    };
    await db.insert(SelectQuizTable).values(payload).onConflictDoUpdate({
      target: SelectQuizTable.quizId,
      set: payload,
    });
  } else if (values.type === "true_false") {
    const payload = {
      quizId,
      answer: values.answer,
    };
    await db.insert(TFQuizTable).values(payload).onConflictDoUpdate({
      target: TFQuizTable.quizId,
      set: payload,
    });
  } else if (values.type === "text") {
    const payload = {
      quizId,
      answer: values.answer,
    };
    await db.insert(TextQuizTable).values(payload).onConflictDoUpdate({
      target: TextQuizTable.quizId,
      set: payload,
    });
  }
}

export async function getQuizById(id: number) {
  const quiz = await db.query.QuizTable.findFirst({
    where: (table, { eq }) => eq(table.id, id),
  });

  if (!quiz) return null;

  if (quiz.type === "select") {
    return {
      ...quiz,
      ...(await db.query.SelectQuizTable.findFirst({
        where: (table, { eq }) => eq(table.quizId, quiz.id),
      })),
      type: "select" as const,
    };
  }
  if (quiz.type === "text") {
    return {
      ...quiz,
      ...(await db.query.TextQuizTable.findFirst({
        where: (table, { eq }) => eq(table.quizId, quiz.id),
      })),
      type: "text" as const,
    };
  }
  if (quiz.type === "true_false") {
    return {
      ...quiz,
      ...(await db.query.TFQuizTable.findFirst({
        where: (table, { eq }) => eq(table.quizId, quiz.id),
      })),
      type: "true_false" as const,
    };
  }
}

export async function getRandomQuizzes(limit: number) {
  const quizIds = await db
    .select({ id: QuizTable.id })
    .from(QuizTable)
    .orderBy(sql`random()`)
    .limit(limit);
  const quizzes = await Promise.all(quizIds.map((q) => getQuizById(q.id)));
  return quizzes;
}

export type FullQuiz = Awaited<ReturnType<typeof getQuizById>>;
