import "server-only";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { DepartmentTable } from "@/db/schema";
import type { DepartmentValues } from "@/features/departments/editor";
import { DepartmentSchema } from "@/features/departments/types";

export async function getDepartments() {
  const rows = await db.query.DepartmentTable.findMany({
    orderBy: [asc(DepartmentTable.order), asc(DepartmentTable.id)],
  });
  return rows.map((row) => DepartmentSchema.parse(row));
}

export async function insertDepartment(values: DepartmentValues) {
  // Append the new department after the existing ones.
  const rows = await db.select({ order: DepartmentTable.order }).from(DepartmentTable);
  const nextOrder = rows.reduce((max, row) => Math.max(max, row.order), -1) + 1;
  const [row] = await db
    .insert(DepartmentTable)
    .values({ ...values, order: nextOrder })
    .returning();
  return DepartmentSchema.parse(row);
}

export async function updateDepartment(id: number, values: DepartmentValues) {
  const [row] = await db.update(DepartmentTable).set(values).where(eq(DepartmentTable.id, id)).returning();
  return row ? DepartmentSchema.parse(row) : null;
}

/** Deletes a department. Belonging students are removed via the FK `onDelete: cascade`. */
export async function deleteDepartment(id: number) {
  await db.delete(DepartmentTable).where(eq(DepartmentTable.id, id));
}

/** Persists a new display order; `ids` is the desired order, each id's index becomes its `order`. */
export async function reorderDepartments(ids: number[]) {
  await db.transaction(async (tx) => {
    // Sequential: a single transaction connection can't run queries concurrently.
    for (const [index, id] of ids.entries()) {
      await tx.update(DepartmentTable).set({ order: index }).where(eq(DepartmentTable.id, id));
    }
  });
}
