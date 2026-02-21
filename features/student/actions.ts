"use server";

import { eq } from "drizzle-orm";
import { unstable_cache, updateTag } from "next/cache";
import { db } from "@/lib/db";
import { DepartmentTable, FacultyTable, StudentTable } from "@/lib/db/schema";
import { requireRole } from "../auth/actions";
import type { StudentValues } from "./editor";

export const getStudents = unstable_cache(() => db.select().from(StudentTable), ["students"], { tags: ["students"] });

export const getDepartments = unstable_cache(() => db.select().from(DepartmentTable), ["departments"], {
  tags: ["departments"],
});

export const getFaculties = unstable_cache(() => db.select().from(FacultyTable), ["faculties"], {
  tags: ["faculties"],
});

export async function insertStudents(values: StudentValues[]) {
  await requireRole(["admin"]);
  try {
    const students = await db.insert(StudentTable).values(values).returning().execute();
    updateTag("students");

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
  await requireRole(["admin"]);
  try {
    const [student] = await db.update(StudentTable).set(values).where(eq(StudentTable.id, id)).returning().execute();
    updateTag("students");
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
  await requireRole(["admin"]);
  try {
    await db.delete(StudentTable).where(eq(StudentTable.id, id)).execute();
    updateTag("students");
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
