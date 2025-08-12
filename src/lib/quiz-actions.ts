"use server";

import { asc, desc, eq, sql } from "drizzle-orm";
import { db } from "./db";
import {
  QuizTable,
  SelectQuizTable,
  TextQuizTable,
  TrueFalseQuizTable,
} from "./db/schema/quiz";
import { QuizValues } from "./quiz-editor";
import {
  QuizData,
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
    });

  if (values.type === "select") {
    await db.insert(SelectQuizTable).values({
      quizId,
      correctChoicesText: values.correctChoicesText,
      incorrectChoicesText: values.incorrectChoicesText,
    });
  } else if (values.type === "true_false") {
    await db.insert(TrueFalseQuizTable).values({
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
    await db.insert(TrueFalseQuizTable).values(payload).onConflictDoUpdate({
      target: TrueFalseQuizTable.quizId,
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
      ...(await db.query.TrueFalseQuizTable.findFirst({
        where: (table, { eq }) => eq(table.quizId, quiz.id),
      })),
    });
  }

  throw new Error(`Failed to get quiz: ${id}`);
}

export async function getQuizzes({
  limit,
  orderBy,
}: {
  limit: number;
  orderBy: "random" | "created_at_desc";
}): Promise<QuizData[]> {
  const orderByMap = {
    random: sql`random()`,
    created_at_desc: desc(QuizTable.createdAt),
  };

  const rows = await db
    .select({
      id: QuizTable.id,
      type: QuizTable.type,
      question: QuizTable.question,
      explanation: QuizTable.explanation,
      isPublished: QuizTable.isPublished,
      createdAt: QuizTable.createdAt,
      select_correctChoicesText: SelectQuizTable.correctChoicesText,
      select_incorrectChoicesText: SelectQuizTable.incorrectChoicesText,
      text_answer: TextQuizTable.answer,
      true_false_answer: TrueFalseQuizTable.answer,
    })
    .from(QuizTable)
    .leftJoin(SelectQuizTable, eq(QuizTable.id, SelectQuizTable.quizId))
    .leftJoin(TextQuizTable, eq(QuizTable.id, TextQuizTable.quizId))
    .leftJoin(TrueFalseQuizTable, eq(QuizTable.id, TrueFalseQuizTable.quizId))
    .orderBy(orderByMap[orderBy])
    .limit(limit);

  return rows.map((row) => {
    const commonData = {
      id: row.id,
      type: row.type,
      question: row.question,
      explanation: row.explanation,
      isPublished: row.isPublished,
      createdAt: row.createdAt,
    };
    if (row.type === "select") {
      return SelectQuizSchema.parse({
        ...commonData,
        correctChoicesText: row.select_correctChoicesText,
        incorrectChoicesText: row.select_incorrectChoicesText,
      });
    }
    if (row.type === "text") {
      return TextQuizSchema.parse({
        ...commonData,
        answer: row.text_answer,
      });
    }
    if (row.type === "true_false") {
      return TrueFalseQuizSchema.parse({
        ...commonData,
        answer: row.true_false_answer,
      });
    }
    throw new Error(`Unknown quiz type: ${row.type}`);
  });
}
