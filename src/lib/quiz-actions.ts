"use server";

import { eq, sql } from "drizzle-orm";
import { db } from "./db";
import {
  QuizTable,
  SelectQuizTable,
  TextQuizTable,
  TFQuizTable,
} from "./db/schema/quiz";
import { QuizValues } from "./quiz-editor";
import {
  SelectQuizSchema,
  TextQuizSchema,
  TrueFalseQuizSchema,
} from "./quiz-data";

export async function insertQuiz(values: QuizValues) {
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
    })

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

export async function updateQuiz(quizId: number, values: QuizValues) {
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
  if (!quiz) {
    throw new Error(`Quiz not found: ${id}`);
  }

  if (quiz.type === "select") {
    return SelectQuizSchema.parse({
      ...quiz,
      ...(await db.query.SelectQuizTable.findFirst({
        where: (table, { eq }) => eq(table.quizId, quiz.id),
      })),
    });
  }
  if (quiz.type === "text") {
    return TextQuizSchema.parse({
      ...quiz,
      ...(await db.query.TextQuizTable.findFirst({
        where: (table, { eq }) => eq(table.quizId, quiz.id),
      })),
    });
  }
  if (quiz.type === "true_false") {
    return TrueFalseQuizSchema.parse({
      ...quiz,
      ...(await db.query.TFQuizTable.findFirst({
        where: (table, { eq }) => eq(table.quizId, quiz.id),
      })),
    });
  }

  throw new Error(`Failed to get quiz: ${id}`);
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
