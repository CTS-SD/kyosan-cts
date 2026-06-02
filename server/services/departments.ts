import "server-only";
import { db } from "@/db";
import { DepartmentSchema } from "@/features/students/types";

export async function getDepartments() {
  const rows = await db.query.DepartmentTable.findMany();
  return rows.map((row) => DepartmentSchema.parse(row));
}
