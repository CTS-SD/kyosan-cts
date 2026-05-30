import "server-only";
import { db } from "@/db";
import { FacultySchema } from "@/features/students/types";

export async function getFaculties() {
  const rows = await db.query.FacultyTable.findMany();
  return rows.map((row) => FacultySchema.parse(row));
}
