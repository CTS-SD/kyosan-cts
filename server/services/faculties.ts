import "server-only";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { FacultyTable } from "@/db/schema";
import type { FacultyValues } from "@/features/faculties/editor";
import { FacultySchema } from "@/features/students/types";

export async function getFaculties() {
  const rows = await db.query.FacultyTable.findMany();
  return rows.map((row) => FacultySchema.parse(row));
}

export async function insertFaculty(values: FacultyValues) {
  const [row] = await db.insert(FacultyTable).values(values).returning();
  return FacultySchema.parse(row);
}

export async function updateFaculty(id: number, values: FacultyValues) {
  const [row] = await db.update(FacultyTable).set(values).where(eq(FacultyTable.id, id)).returning();
  return row ? FacultySchema.parse(row) : null;
}

/** Deletes a faculty. Belonging students are removed via the FK `onDelete: cascade`. */
export async function deleteFaculty(id: number) {
  await db.delete(FacultyTable).where(eq(FacultyTable.id, id));
}
