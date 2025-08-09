"use server";

import { eq } from "drizzle-orm";
import { db } from "../db";
import {
  Quiz,
  QuizTable,
  SelectQuizTable,
  TextQuizTable,
  TFQuizTable,
} from "../db/schema";
import { QuizFormValues } from "../quiz-form";

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
  const [quiz] = await db
    .select()
    .from(QuizTable)
    .where(eq(QuizTable.id, id))
    .leftJoin(SelectQuizTable, eq(SelectQuizTable.quizId, QuizTable.id))
    .leftJoin(TextQuizTable, eq(TextQuizTable.quizId, QuizTable.id))
    .leftJoin(TFQuizTable, eq(TFQuizTable.quizId, QuizTable.id))
    .execute();

  if (!quiz) return null;
  if (!quiz.select_quiz && !quiz.text_quiz && !quiz.true_false_quiz)
    return null;

  return quiz;
}

export type FullQuiz = NonNullable<Awaited<ReturnType<typeof getQuizById>>>;
