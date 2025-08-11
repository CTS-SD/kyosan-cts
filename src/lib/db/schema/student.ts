import { InferSelectModel } from "drizzle-orm";
import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const StudentTable = pgTable("student", {
  id: serial("id").primaryKey(),
  studentNumber: varchar("student_number", { length: 6 }).unique().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  departmentId: integer("department_id")
    .notNull()
    .references(() => DepartmentTable.id, { onDelete: "cascade" }),
  facultyId: integer("faculty_id")
    .notNull()
    .references(() => FacultyTable.id, { onDelete: "cascade" }),
});

export const DepartmentTable = pgTable("department", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).unique().notNull(),
});

export const FacultyTable = pgTable("faculty", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).unique().notNull(),
});

export type Student = InferSelectModel<typeof StudentTable>;
export type Department = InferSelectModel<typeof DepartmentTable>;
export type Faculty = InferSelectModel<typeof FacultyTable>;
