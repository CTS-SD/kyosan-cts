import "server-only";
import { eq } from "drizzle-orm";
import { cache } from "react";
import { db } from "@/db";
import { StudentTable } from "@/db/schema";
import type { StudentValues } from "@/features/students/editor";
import { StudentSchema, StudentWithRelationsSchema } from "@/features/students/types";
import { getDepartments } from "./departments";
import { getFaculties } from "./faculties";

export const getStudents = cache(async () => {
  const [students, departments, faculties] = await Promise.all([
    db.query.StudentTable.findMany(),
    getDepartments(),
    getFaculties(),
  ]);

  const departmentById = new Map(departments.map((d) => [d.id, d]));
  const facultyById = new Map(faculties.map((f) => [f.id, f]));

  return students.map((student) =>
    StudentWithRelationsSchema.parse({
      ...student,
      department: departmentById.get(student.departmentId) ?? null,
      faculty: facultyById.get(student.facultyId) ?? null,
    }),
  );
});

export const getDepartmentCounts = cache(async () => {
  const students = await getStudents();
  return students.reduce<Record<number, number>>((acc, student) => {
    acc[student.departmentId] = (acc[student.departmentId] ?? 0) + 1;
    return acc;
  }, {});
});

export const getFacultyCounts = cache(async () => {
  const students = await getStudents();
  return students.reduce<Record<number, number>>((acc, student) => {
    acc[student.facultyId] = (acc[student.facultyId] ?? 0) + 1;
    return acc;
  }, {});
});

export async function getStudentByStudentNumber(studentNumber: string) {
  const student = await db.query.StudentTable.findFirst({
    where: (t, { eq }) => eq(t.studentNumber, studentNumber),
  });
  return student ? StudentSchema.parse(student) : null;
}

/**
 * Form options for student creation/editing.
 * @returns departments and faculties
 */
export async function getStudentOptions() {
  const [departments, faculties] = await Promise.all([getDepartments(), getFaculties()]);
  return { departments, faculties };
}

export async function existsStudentByStudentNumber(studentNumber: string) {
  const student = await db.query.StudentTable.findFirst({
    where: (t, { eq }) => eq(t.studentNumber, studentNumber),
    columns: { id: true },
  });
  return student !== undefined;
}

export async function insertStudents(values: StudentValues[]) {
  const rows = await db.insert(StudentTable).values(values).returning();
  return rows.map((row) => StudentSchema.parse(row));
}

export async function updateStudent(id: number, values: StudentValues) {
  const [row] = await db.update(StudentTable).set(values).where(eq(StudentTable.id, id)).returning();
  return row ? StudentSchema.parse(row) : null;
}

export async function deleteStudent(id: number) {
  await db.delete(StudentTable).where(eq(StudentTable.id, id));
}
