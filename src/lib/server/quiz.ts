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
    const existing = await db.query.SelectQuizTable.findFirst({
      where: (table, { eq }) => eq(table.quizId, quizId),
    });
    if (existing) {
      await db
        .update(SelectQuizTable)
        .set({
          correctChoicesText: values.correctChoicesText,
          incorrectChoicesText: values.incorrectChoicesText,
        })
        .where(eq(SelectQuizTable.quizId, quizId));
    } else {
      await db.insert(SelectQuizTable).values({
        quizId,
        correctChoicesText: values.correctChoicesText,
        incorrectChoicesText: values.incorrectChoicesText,
      });
    }
  } else if (values.type === "true_false") {
    const existing = await db.query.TFQuizTable.findFirst({
      where: (table, { eq }) => eq(table.quizId, quizId),
    });
    if (existing) {
      await db
        .update(TFQuizTable)
        .set({
          answer: values.answer,
        })
        .where(eq(TFQuizTable.quizId, quizId));
    } else {
      await db.insert(TFQuizTable).values({
        quizId,
        answer: values.answer,
      });
    }
  } else if (values.type === "text") {
    const existing = await db.query.TextQuizTable.findFirst({
      where: (table, { eq }) => eq(table.quizId, quizId),
    });
    if (existing) {
      await db
        .update(TextQuizTable)
        .set({
          answer: values.answer,
        })
        .where(eq(TextQuizTable.quizId, quizId));
    } else {
      await db.insert(TextQuizTable).values({
        quizId,
        answer: values.answer,
      });
    }
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

export type FullQuiz = NonNullable<Awaited<ReturnType<typeof getQuizById>>>;
