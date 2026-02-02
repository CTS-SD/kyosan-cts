import { cache } from "react";
import { db } from "@/lib/db";
import { DepartmentTable, FacultyTable, StudentTable } from "@/lib/db/schema";

export type StudentBundle = Awaited<ReturnType<typeof getStudentBundle>>;

export const getStudentBundle = cache(async () => {
  const [students, departments, faculties] = await Promise.all([
    db.select().from(StudentTable),
    db.select().from(DepartmentTable),
    db.select().from(FacultyTable),
  ]);
  return { students, departments, faculties };
});
