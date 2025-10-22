"use server";

import { db } from "./db";
import { StudentTable } from "./db/schema";
import { eq } from "drizzle-orm";
import { StudentValues } from "./student-editor";

export async function insertStudents(values: StudentValues[]) {
  try {
    const students = await db
      .insert(StudentTable)
      .values(values)
      .returning()
      .execute();

    return {
      success: true as const,
      data: students,
      message: "学生を追加しました",
    };
  } catch (e) {
    return {
      success: false as const,
      message: e instanceof Error ? e.message : "学生の追加に失敗しました",
    };
  }
}

export async function updateStudent(id: number, values: StudentValues) {
  try {
    const [student] = await db
      .update(StudentTable)
      .set(values)
      .where(eq(StudentTable.id, id))
      .returning()
      .execute();
    return {
      success: true as const,
      data: student,
      message: "学生を更新しました",
    };
  } catch (e) {
    return {
      success: false as const,
      message: e instanceof Error ? e.message : "学生の更新に失敗しました",
    };
  }
}

export async function deleteStudent(id: number) {
  try {
    await db.delete(StudentTable).where(eq(StudentTable.id, id)).execute();
    return {
      success: true as const,
      message: "学生を削除しました",
    };
  } catch (e) {
    return {
      success: false as const,
      message: e instanceof Error ? e.message : "学生の削除に失敗しました",
    };
  }
}

export async function existsStudentByStudentNumber(studentNumber: string) {
  const student = await db
    .select()
    .from(StudentTable)
    .where(eq(StudentTable.studentNumber, studentNumber))
    .limit(1)
    .execute();
  return student.length > 0;
}
